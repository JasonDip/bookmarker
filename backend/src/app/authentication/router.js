const express = require("express");
const controller = require("./controller");

const router = new express.Router();

/*  log in  */
router.post("/login", controller.login);

/*  log out  */
router.post("/logout", controller.logout);

module.exports = router;
