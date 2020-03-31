const bcrypt = require("bcryptjs");
const { User } = require("../user/model");

module.exports.login = async (req, res) => {
    try {
        if (req.session.isLoggedIn) {
            return res
                .status(401)
                .send({ error: "You are already logged in an account." });
        }

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

        // TODO: CSRF Token?

        // save session info
        // note: data is saved in db, client cookie only has session id
        req.session.isLoggedIn = true;
        req.session.user = findUser;
        req.session.save();

        await findUser
            .populate("ownedCollections", { _id: 1, name: 1, note: 1 })
            .execPopulate();

        return res.status(200).send({
            name: findUser.name,
            email: findUser.email,
            ownedCollections: findUser.ownedCollections
        });
    } catch (e) {
        return res.status(401).send({
            error: "Invalid email or password."
        });
    }
};

module.exports.logout = async (req, res) => {
    req.session.destroy();
    return res.status(204).send();
};
