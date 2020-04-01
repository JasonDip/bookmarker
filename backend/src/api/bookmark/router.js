const express = require("express");
const controller = require("./controller");
const isAuth = require("../../middleware/isAuth");
const ownsBundle = require("../../middleware/ownsBundle");

const router = new express.Router();

/*  create a bookmark for a bundle  */
router.post(
    "/bundles/:bundleId/bookmarks",
    isAuth,
    ownsBundle,
    controller.createBookmark
);

/*  modify an existing bookmark  */
router.patch(
    "/bundles/:bundleId/bookmarks/:bookmarkId",
    isAuth,
    ownsBundle,
    controller.modifyBookmark
);

/*  move a bookmark between bundles  */
router.patch(
    "/bundles/:bundleId/bookmarks/:bookmarkId/move/:newBundleId",
    isAuth,
    ownsBundle,
    controller.moveBookmark
);

/*  delete a bookmark from a bundle  */
router.delete(
    "/bundles/:bundleId/bookmarks/:bookmarkId",
    isAuth,
    ownsBundle,
    controller.deleteBookmark
);

module.exports = router;
