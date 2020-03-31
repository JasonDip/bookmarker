const express = require("express");

/*  routers  */
const authenticationRouter = require("../models/authentication/authenticationRouter");
const userRouter = require("../models/user/userRouter");
const bundleRouter = require("../models/bundle/bundleRouter");
const bookmarkRouter = require("../models/bookmark/bookmarkRouter");

/*  middlewares  */
const session = require("../middlewares/session");
const CORS = require("../middlewares/CORS");

/*  server configuration  */
const server = express();
server.use(express.json());
server.use(CORS);
server.use(session);
server.use(authenticationRouter);
server.use(userRouter);
server.use(bundleRouter);
server.use(bookmarkRouter);

module.exports = server;
