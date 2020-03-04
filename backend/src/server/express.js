require("../db/mongoose");
const express = require("express");
const bundleRouter = require("../api/bundle/bundleRouter");
const bookmarkRouter = require("../api/bookmark/bookmarkRouter");

const server = express();

server.use(express.json());
server.use(bundleRouter);
server.use(bookmarkRouter);

module.exports = server;
