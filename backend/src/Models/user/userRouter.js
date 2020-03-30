const express = require("express");
const user = require("./user");
const isLoggedIn = require("../../middlewares/isLoggedIn");

const router = new express.Router();

/*  create a new user  */
router.post("/user", user.createNewUser);

/*  delete current logged in user  */
router.delete("/user", isLoggedIn, user.deleteUser);

/*  get current user information  */
router.get("/user", isLoggedIn, user.getUserInfo);

/*  change password  */
router.patch("/user/password", isLoggedIn, user.changePassword);

module.exports = router;
