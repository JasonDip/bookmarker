const express = require("express");
const authentication = require("./authentication");

const router = new express.Router();

/*  log in  */
router.post("/login", authentication.login);

/*  log out  */
router.post("/logout", authentication.logout);

module.exports = router;
