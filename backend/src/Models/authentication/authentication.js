const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = require("../user/userSchema");
const User = mongoose.model("User", userSchema);

module.exports.login = async userObj => {
    try {
        const findUser = await User.findOne({ email: userObj.email });
        if (!findUser) {
            throw new Error("Could not find user.");
        }
        const isMatch = await bcrypt.compare(
            userObj.password,
            findUser.hashedPassword
        );
        if (!isMatch) {
            throw new Error("Incorrect password.");
        }
        return {
            success: true,
            message: findUser
        };
    } catch (e) {
        return {
            success: false,
            error: e
        };
    }
};

module.exports.logout = async () => {};
