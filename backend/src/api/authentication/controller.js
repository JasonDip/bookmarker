const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../user/model");

module.exports.login = async (req, res, next) => {
    try {
        // find the user and match input password to hashed password
        const findUser = await User.findOne({ email: req.body.email });
        if (!findUser) {
            throw new Error("Could not find user.");
        }
        const isMatch = await bcrypt.compare(
            req.body.password,
            findUser.hashedPassword
        );
        if (!isMatch) {
            throw new Error("Incorrect password.");
        }

        // create jwt
        const token = jwt.sign(
            {
                _id: findUser._id.toString()
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        // TODO: save jwt?

        await findUser
            .populate("ownedCollections", { _id: 1, name: 1, note: 1 })
            .execPopulate();

        return res.status(200).send({
            _id: findUser._id.toString(),
            name: findUser.name,
            email: findUser.email,
            ownedCollections: findUser.ownedCollections,
            token: token
        });
    } catch (e) {
        const error = new Error("Invalid email or password.");
        error.statusCode = 401;
        error.name = "Login Error";
        return next(error);
    }
};

module.exports.logout = async (req, res, next) => {
    // TODO: delete jwt?
    return res.status(204).send();
};
