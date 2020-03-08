const express = require("express");
const mongoose = require("mongoose");
const Bundle = require("../bundle/bundleModel");
const bookmarkSchema = require("../bookmark/bookmarkSchema");

const router = new express.Router();

const Bookmark = mongoose.model("Bookmark", bookmarkSchema);

// create a bookmark for a bundle
router.post("/bundles/:bundleId/bookmarks", async (req, res) => {
    // TODO: check user auth for bundle

    const bookmark = new Bookmark({
        name: req.body.name,
        url: req.body.url,
        note: req.body.note
    });

    try {
        const updatedBundle = await Bundle.findByIdAndUpdate(
            req.params.bundleId,
            {
                $push: { bookmarks: bookmark }
            },
            { new: true }
        );
        res.status(201).send(bookmark);
    } catch (e) {
        res.status(404).send({
            error: `Error creating bookmark - ${e.message}`
        });
    }
});

// modify an existing bookmark
router.patch("/bundles/:bundleId/bookmarks/:bookmarkId", async (req, res) => {
    // TODO: check user auth on bundle

    try {
        await Bundle.updateOne(
            {
                _id: req.params.bundleId,
                "bookmarks._id": req.params.bookmarkId
            },
            {
                $set: {
                    "bookmarks.$.name": req.body.name,
                    "bookmarks.$.url": req.body.url,
                    "bookmarks.$.note": req.body.note
                }
            }
        );
        const bundle = await Bundle.findById(req.params.bundleId); // TODO: is returning bundle needed?
        res.status(200).send(bundle);
    } catch (e) {
        res.status(404).send({
            error: `Error modifying bookmark - ${e.message}`
        });
    }
});

// move a bookmark between bundles
router.patch(
    "/bundles/:bundleId/bookmarks/:bookmarkId/move/:newBundleId",
    async (req, res) => {
        // TODO: check user auth on both bundles

        try {
            // get the bookmark
            const bookmarkBeforeDelete = await Bundle.findOne({
                _id: req.params.bundleId
            }).select({
                bookmarks: {
                    $elemMatch: {
                        _id: req.params.bookmarkId
                    }
                }
            });
            const bookmark = new Bookmark({
                name: bookmarkBeforeDelete.bookmarks[0].name,
                url: bookmarkBeforeDelete.bookmarks[0].url,
                note: bookmarkBeforeDelete.bookmarks[0].note
            });

            // add bookmark to newBundleId
            const addedToBundle = await Bundle.findByIdAndUpdate(
                req.params.newBundleId,
                {
                    $push: {
                        bookmarks: bookmark
                    }
                },
                { new: true }
            );

            // delete bookmark from bundleId
            const removedFromBundle = await Bundle.findByIdAndUpdate(
                req.params.bundleId,
                {
                    $pull: {
                        bookmarks: { _id: req.params.bookmarkId }
                    }
                },
                { new: true }
            );

            res.status(200).send([removedFromBundle, addedToBundle]);
        } catch (e) {
            res.status(404).send({
                error: `Error moving bookmark - ${e.message}`
            });
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
        res.status(204).send(updatedBundle);
    } catch (e) {
        res.status(404).send({
            error: `Error deleting bookmark - ${e.message}`
        });
    }
});

module.exports = router;
