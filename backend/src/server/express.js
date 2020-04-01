const express = require("express");

/*  routers  */
const authenticationRouter = require("../api/authentication/router");
const userRouter = require("../api/user/router");
const bundleRouter = require("../api/bundle/router");
const bookmarkRouter = require("../api/bookmark/router");

/*  middlewares  */
const CORS = require("../middleware/CORS");
const errorHandler = require("../middleware/errorHandler");

/*  server configuration  */
const server = express();
server.use(express.json());
server.use(CORS);
server.use(authenticationRouter);
server.use(userRouter);
server.use(bundleRouter);
server.use(bookmarkRouter);
server.use(errorHandler);

module.exports = server;
