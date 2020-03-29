const express = require("express");
const user = require("./user");
const isLoggedIn = require("../../middlewares/isLoggedIn");

const router = new express.Router();

/*  create a new user  */
router.post("/users", async (req, res) => {
    if (req.session.isLoggedIn) {
        res.status(401).send({ error: "Currently logged in to a user." });
    }

    const result = await user.createNewUser(req.body);

    // TODO: email confirmation

    if (result.success) {
        res.status(204).send();
    } else if (result.error.name === "ValidationError") {
        res.status(400).send({ error: "Email is invalid." });
    } else {
        res.status(400).send({ error: result.error.message });
    }
});

/*  delete current logged in user  */
router.delete("/users", isLoggedIn, async (req, res) => {
    if (req.session.user.email !== req.body.email) {
        return res.status(401).send({ error: "Cannot delete another user." });
    }

    const result = await user.deleteUser(req.body);

    // TODO: email confirmation

    if (result.success) {
        return res.status(204).send();
    } else {
        return res.status(400).send({ error: "Invalid email or password." });
    }
});

module.exports = router;
