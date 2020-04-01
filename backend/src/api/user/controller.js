const bcrypt = require("bcryptjs");
const bundleUtil = require("../util/bundleUtil");
const { User } = require("./model");

module.exports.createNewUser = async (req, res, next) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            const error = new Error("User with this email already exists.");
            error.statusCode = 400;
            throw error;
        }

        hashed = await bcrypt.hash(req.body.password, 12);
        newUser = new User({
            name: req.body.name,
            email: req.body.email,
            hashedPassword: hashed
        });
        await newUser.save();

        // TODO: email confirmation

        return res.status(204).send();
    } catch (e) {
        if (e.name === "ValidationError") {
            e.message = "Email is invalid.";
        }
        e.name = "Create New User Error";
        e.statusCode = e.statusCode || 500;
        return next(e);
    }
};

module.exports.deleteUser = async (req, res, next) => {
    try {
        const existingUser = await User.findById(req.user._id);
        if (!existingUser) {
            let error = new Error("Could not find user.");
            error.statusCode = 404;
            throw error;
        }

        const isMatch = await bcrypt.compare(
            req.body.password,
            existingUser.hashedPassword
        );
        if (!isMatch) {
            let error = new Error("Incorrect password.");
            error.statusCode = 401;
            throw error;
        }

        // TODO: email confirmation

        // delete collections owned by user
        bundleUtil.deleteUtil(existingUser.ownedCollections);

        // TODO: delete jwt?

        // complete deleting user
        await User.findByIdAndDelete(existingUser._id);
        return res.status(204).send();
    } catch (e) {
        // always give same error message to avoid giving out too much info
        let error = new Error("Invalid email or password.");
        error.name = "Delete User Error";
        error.statusCode = e.statusCode || 500;
        return next(error);
    }
};

module.exports.getUserInfo = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);

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
        e.statusCode = e.statusCode || 500;
        return next(e);
    }
};

module.exports.changePassword = async (req, res, next) => {
    try {
        let user = await User.findById(req.user._id);
        if (!user) {
            const error = new Error("Could not find user.");
            error.statusCode = 404;
            throw error;
        }
        const isMatch = await bcrypt.compare(
            req.body.password,
            user.hashedPassword
        );
        if (!isMatch) {
            const error = new Error("Incorrect password.");
            error.statusCode = 401;
            throw error;
        }

        // store new hashed password
        let newPass = await bcrypt.hash(req.body.newPassword, 12);
        await User.findByIdAndUpdate(req.user._id, {
            hashedPassword: newPass
        });

        // TODO: destroy all jwt?

        return res.status(204).send();
    } catch (e) {
        const error = new Error("Error changing password.");
        error.name = "Change Password Error";
        error.statusCode = error.statusCode || 500;
        return next(error);
    }
};