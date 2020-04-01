const express = require("express");
const controller = require("./controller");
const isAuth = require("../../middleware/isAuth");

const router = new express.Router();

/*  create a new user  */
router.post("/user", controller.createNewUser);

/*  delete current logged in user  */
router.delete("/user", isAuth, controller.deleteUser);

/*  get current user information  */
router.get("/user", isAuth, controller.getUserInfo);

/*  change password  */
router.patch("/user/password", isAuth, controller.changePassword);

module.exports = router;
