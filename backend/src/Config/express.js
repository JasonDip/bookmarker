const express = require("express");

/*  Routers  */
const bundleRouter = require("../routers/bundleRouter");
const bookmarkRouter = require("../routers/bookmarkRouter");

/*  Middlewares  */
const session = require("../middlewares/session");

/*  Server  */
const server = express();
server.use(express.json());
server.use(session);
server.use(bundleRouter);
server.use(bookmarkRouter);

module.exports = server;
