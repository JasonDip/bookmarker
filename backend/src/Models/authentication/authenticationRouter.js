const express = require("express");
const authentication = require("./authentication");

const router = new express.Router();

/*  log in  */
router.post("/login", async (req, res) => {
    const result = await authentication.login(req.body);

    if (result.success) {
        // TODO: CSRF Token?

        // create session
        req.session.isLoggedIn = true;
        req.session.user = result.message;
        req.session.save();

        res.status(200).send({
            name: result.message.name,
            email: result.message.email,
            ownedBundles: result.message.ownedBundles
        });
    } else {
        res.status(401).send({
            error: "Invalid email or password."
        });
    }
});

router.post("/logout", async (req, res) => {});

module.exports = router;
