const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const bundleUtil = require("../util/bundleUtil");

const userSchema = require("./userSchema");
const User = mongoose.model("User", userSchema);

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

        // TODO: delete session

        // delete collections owned by user
        bundleUtil.deleteUtil(existingUser.ownedCollections);

        await User.findByIdAndDelete(existingUser._id);
        return res.status(204).send();
    } catch (e) {
        return res.status(400).send({ error: "Invalid email or password." });
    }
};
