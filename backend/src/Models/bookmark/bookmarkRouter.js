const express = require("express");
const bookmark = require("./bookmark");
const isLoggedIn = require("../../middlewares/isLoggedIn");
const ownsBundle = require("../../middlewares/ownsBundle");

const router = new express.Router();

/*  create a bookmark for a bundle  */
router.post(
    "/bundles/:bundleId/bookmarks",
    isLoggedIn,
    ownsBundle,
    bookmark.createBookmark
);

/*  modify an existing bookmark  */
router.patch(
    "/bundles/:bundleId/bookmarks/:bookmarkId",
    isLoggedIn,
    ownsBundle,
    bookmark.modifyBookmark
);

/*  move a bookmark between bundles  */
router.patch(
    "/bundles/:bundleId/bookmarks/:bookmarkId/move/:newBundleId",
    isLoggedIn,
    ownsBundle,
    bookmark.moveBookmark
);

/*  delete a bookmark from a bundle  */
router.delete(
    "/bundles/:bundleId/bookmarks/:bookmarkId",
    isLoggedIn,
    ownsBundle,
    bookmark.deleteBookmark
);

module.exports = router;
