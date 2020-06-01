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

        // save session info
        // note: data is saved in db, client cookie only has session id
        req.session.isLoggedIn = true;
        req.session.user = findUser;
        req.session.save();

        // create access jwt
        const token = jwt.sign(
            {
                _id: findUser._id.toString(),
            },
            process.env.JWT_SECRET,
            { expiresIn: "30 days" }
        );

        // populate ownedCollections information useful for showing upon login
        await findUser
            .populate("ownedCollections", { _id: 1, name: 1, note: 1 })
            .execPopulate();

        return res.status(200).send({
            _id: findUser._id.toString(),
            name: findUser.name,
            email: findUser.email,
            ownedCollections: findUser.ownedCollections,
            token: token,
        });
    } catch (e) {
        const error = new Error("Invalid email or password.");
        error.statusCode = 401;
        error.name = "Login Error";
        return next(error);
    }
};

module.exports.logout = async (req, res, next) => {
    req.session.destroy();
    return res.status(204).send();
};
