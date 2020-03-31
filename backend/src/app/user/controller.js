const bcrypt = require("bcryptjs");
const bundleUtil = require("../util/bundleUtil");
const { User } = require("./model");

module.exports.createNewUser = async (req, res) => {
    try {
        if (req.session.isLoggedIn) {
            return res
                .status(401)
                .send({ error: "Currently logged in to a user." });
        }

        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            throw new Error("User with this email already exists.");
        }

        hash = await bcrypt.hash(req.body.password, 12);
        newUser = new User({
            name: req.body.name,
            email: req.body.email,
            hashedPassword: hash
        });
        await newUser.save();

        // TODO: email confirmation

        return res.status(204).send();
    } catch (e) {
        if (e.name === "ValidationError") {
            return res.status(400).send({ error: "Email is invalid." });
        } else {
            return res.status(400).send({ error: e.message });
        }
    }
};

module.exports.deleteUser = async (req, res) => {
    try {
        if (!req.session.isLoggedIn) {
            return res
                .status(401)
                .send({ error: "Must be logged in to delete account." });
        }
        if (req.session.user.email !== req.body.email) {
            return res
                .status(401)
                .send({ error: "Cannot delete another user." });
        }

        const existingUser = await User.findOne({ email: req.body.email });
        if (!existingUser) {
            throw new Error("Could not find a user with this email.");
        }
        const isMatch = await bcrypt.compare(
            req.body.password,
            existingUser.hashedPassword
        );
        if (!isMatch) {
            throw new Error("Incorrect password.");
        }

        // TODO: email confirmation

        // delete session (similar to logging out)
        req.session.destroy();

        // delete collections owned by user
        bundleUtil.deleteUtil(existingUser.ownedCollections);

        await User.findByIdAndDelete(existingUser._id);
        return res.status(204).send();
    } catch (e) {
        return res.status(400).send({ error: "Invalid email or password." });
    }
};

module.exports.getUserInfo = async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id);

        // refresh the session with newest info
        req.session.user = user;
        req.session.save();

        // populate user's ownedCollections with additional information
        await user
            .populate("ownedCollections", {
                _id: 1,
                name: 1,
                note: 1
            })
            .execPopulate();

        return res.status(200).send({
            name: user.name,
            email: user.email,
            ownedCollections: user.ownedCollections
        });
    } catch (e) {
        return res.status(404).send({ error: e.message });
    }
};

module.exports.changePassword = async (req, res) => {
    try {
        // check current logged in user
        if (req.session.user.email !== req.body.email) {
            return res
                .status(401)
                .send({ error: "Cannot delete another user." });
        }

        // check password vs hashed password
        let user = await User.findById(req.session.user._id);
        if (!user) {
            throw new Error("Could not find user.");
        }
        const isMatch = await bcrypt.compare(
            req.body.password,
            user.hashedPassword
        );
        if (!isMatch) {
            throw new Error("Incorrect password.");
        }

        // store new hashed password
        let newPass = await bcrypt.hash(req.body.newPassword, 12);
        await User.findByIdAndUpdate(req.session.user._id, {
            hashedPassword: newPass
        });

        // destroy session
        req.session.destroy();

        return res.status(204).send();
    } catch (e) {
        return res.status(404).send({ error: "Error changing password." });
    }
};
