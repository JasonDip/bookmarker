const express = require("express");
const bookmark = require("../Models/bookmark/bookmark");

const router = new express.Router();

/*  create a bookmark for a bundle  */
router.post("/bundles/:bundleId/bookmarks", async (req, res) => {
    // TODO: check user auth for bundle

    const result = await bookmark.createBookmark(req.params.bundleId, {
        name: req.body.name,
        url: req.body.url,
        note: req.body.note
    });

    if (result.success) {
        res.status(201).send(result.message);
    } else {
        res.status(404).send({
            error: `Error creating bookmark - ${result.error.message}`
        });
    }
});

/*  modify an existing bookmark  */
router.patch("/bundles/:bundleId/bookmarks/:bookmarkId", async (req, res) => {
    // TODO: check user auth on bundle

    const result = await bookmark.modifyBookmark(
        req.params.bundleId,
        req.params.bookmarkId,
        {
            name: req.body.name,
            url: req.body.url,
            note: req.body.note
        }
    );

    if (result.success) {
        res.status(200).send(result.message);
    } else {
        res.status(404).send({
            error: `Error modifying bookmark - ${result.error.message}`
        });
    }
});

/*  move a bookmark between bundles  */
router.patch(
    "/bundles/:bundleId/bookmarks/:bookmarkId/move/:newBundleId",
    async (req, res) => {
        // TODO: check user auth on both bundles

        let result = await bookmark.moveBookmark(
            req.params.bundleId,
            req.params.bookmarkId,
            req.params.newBundleId
        );

        if (result.success) {
            res.status(200).send(result.message);
        } else {
            res.status(404).send({
                error: `Error moving bookmark - ${result.error.message}`
            });
        }
    }
);

/*  delete a bookmark from a bundle  */
router.delete("/bundles/:bundleId/bookmarks/:bookmarkId", async (req, res) => {
    // TODO: check user auth for bundle

    let result = await bookmark.deleteBookmark(
        req.params.bundleId,
        req.params.bookmarkId
    );

    if (result.success) {
        res.status(204).send(result.message);
    } else {
        res.status(404).send({
            error: `Error deleting bookmark - ${result.error.message}`
        });
    }
});

module.exports = router;
