const express = require("express");
const bundleRouter = require("../Controllers/bundleRouter");
const bookmarkRouter = require("../Controllers/bookmarkRouter");

const server = express();

server.use(express.json());
server.use(bundleRouter);
server.use(bookmarkRouter);

module.exports = server;
