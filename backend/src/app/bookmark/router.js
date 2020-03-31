const express = require("express");
const controller = require("./controller");
const isLoggedIn = require("../../middleware/isLoggedIn");
const ownsBundle = require("../../middleware/ownsBundle");

const router = new express.Router();

/*  create a bookmark for a bundle  */
router.post(
    "/bundles/:bundleId/bookmarks",
    isLoggedIn,
    ownsBundle,
    controller.createBookmark
);

/*  modify an existing bookmark  */
router.patch(
    "/bundles/:bundleId/bookmarks/:bookmarkId",
    isLoggedIn,
    ownsBundle,
    controller.modifyBookmark
);

/*  move a bookmark between bundles  */
router.patch(
    "/bundles/:bundleId/bookmarks/:bookmarkId/move/:newBundleId",
    isLoggedIn,
    ownsBundle,
    controller.moveBookmark
);

/*  delete a bookmark from a bundle  */
router.delete(
    "/bundles/:bundleId/bookmarks/:bookmarkId",
    isLoggedIn,
    ownsBundle,
    controller.deleteBookmark
);

module.exports = router;
