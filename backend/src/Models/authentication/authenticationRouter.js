const express = require("express");
const authentication = require("./authentication");

const router = new express.Router();

/*  log in  */
router.post("/login", authentication.login);

// TODO: logout
router.post("/logout", authentication.logout);

module.exports = router;
