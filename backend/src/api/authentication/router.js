const express = require("express");
const controller = require("./controller");
const isAuth = require("../../middleware/isAuth");

const router = new express.Router();

/*  log in  */
router.post("/login", controller.login);

/*  log out  */
router.post("/logout", isAuth, controller.logout);

module.exports = router;
