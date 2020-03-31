const express = require("express");

/*  routers  */
const authenticationRouter = require("../api/authentication/router");
const userRouter = require("../api/user/router");
const bundleRouter = require("../api/bundle/router");
const bookmarkRouter = require("../api/bookmark/router");

/*  middlewares  */
const session = require("../middleware/session");
const CORS = require("../middleware/CORS");

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
