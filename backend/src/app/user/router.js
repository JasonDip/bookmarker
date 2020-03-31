const express = require("express");
const controller = require("./controller");
const isLoggedIn = require("../../middleware/isLoggedIn");

const router = new express.Router();

/*  create a new user  */
router.post("/user", controller.createNewUser);

/*  delete current logged in user  */
router.delete("/user", isLoggedIn, controller.deleteUser);

/*  get current user information  */
router.get("/user", isLoggedIn, controller.getUserInfo);

/*  change password  */
router.patch("/user/password", isLoggedIn, controller.changePassword);

module.exports = router;
