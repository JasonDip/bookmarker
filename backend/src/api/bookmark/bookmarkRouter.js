const express = require("express");
const mongoose = require("mongoose");
const Bundle = require("../bundle/bundleModel");
const bookmarkSchema = require("../bookmark/bookmarkSchema");

const router = new express.Router();

const Bookmark = mongoose.model("Bookmark", bookmarkSchema);

// create a bookmark for a bundle
router.post("/bundles/:bundleId/bookmarks", async (req, res) => {
    // TODO: check user auth for bundle

    const bookmark = new Bookmark(req.body);

    try {
        const updatedBundle = await Bundle.findByIdAndUpdate(
            req.params.bundleId,
            {
                $push: { bookmarks: bookmark }
            },
            { new: true }
        );
        //res.status(201).send(updatedBundle);
        res.status(201).send(bookmark);
    } catch (e) {
        res.status(404).send({ error: e.message });
    }
});

// modify an existing bookmark
router.patch("/bundles/:bundleId/bookmarks/:bookmarkId", async (req, res) => {
    // TODO: check user auth on bundle

    try {
        const newBookmark = await Bookmark.findByIdAndUpdate(
            req.params.bookmarkId,
            {
                name: req.body.name,
                url: req.body.url,
                note: req.body.note
            },
            {
                new: true,
                runValidators: true
            }
        );
        res.status(200).send(newBookmark);
    } catch (e) {
        res.status(404).send({ error: e.message });
    }
});

// move a bookmark between bundles
router.patch(
    "/bundles/:bundleId/bookmarks/:bookmarkId/move/:newBundleId",
    async (req, res) => {
        // TODO: check user auth on both bundles

        try {
            const newBookmark = await Bookmark.findByIdAndUpdate(
                req.params.bookmarkId,
                {
                    name: req.body.name,
                    url: req.body.url,
                    note: req.body.note
                },
                {
                    new: true,
                    runValidators: true
                }
            );
            res.status(200).send(newBookmark);
        } catch (e) {
            res.status(404).send({ error: e.message });
        }
    }
);

// delete a bookmark from a bundle
router.delete("/bundles/:bundleId/bookmarks/:bookmarkId", async (req, res) => {
    // TODO: check user auth for bundle

    const bookmarkId = mongoose.Types.ObjectId(req.params.bookmarkId);
    try {
        const updatedBundle = await Bundle.findByIdAndUpdate(
            req.params.bundleId,
            {
                $pull: {
                    bookmarks: { _id: bookmarkId }
                }
            },
            { new: true }
        );
        res.status(204).send();
    } catch (e) {
        res.status(404).send({ error: e.message });
    }
});

module.exports = router;
