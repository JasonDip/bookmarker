const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = require("./userSchema");
const User = mongoose.model("User", userSchema);

module.exports.createNewUser = async userObj => {
    try {
        const existingUser = await User.findOne({ email: userObj.email });
        if (existingUser) {
            throw new Error("User with this email already exists.");
        }

        hash = await bcrypt.hash(userObj.password, 12);
        newUser = new User({
            name: userObj.name,
            email: userObj.email,
            hashedPassword: hash
        });
        await newUser.save();
        return {
            success: true,
            message: newUser
        };
    } catch (e) {
        return {
            success: false,
            error: e
        };
    }
};

module.exports.deleteUser = async userObj => {
    try {
        const existingUser = await User.findOne({ email: userObj.email });
        if (!existingUser) {
            throw new Error("Could not find a user with this email.");
        }
        const isMatch = await bcrypt.compare(
            userObj.password,
            existingUser.hashedPassword
        );
        if (!isMatch) {
            throw new Error("Incorrect password.");
        }
        const deleteUser = await User.findByIdAndDelete(existingUser._id);
        return {
            success: true,
            message: deleteUser
        };
    } catch (e) {
        return {
            success: false,
            error: e
        };
    }
};
