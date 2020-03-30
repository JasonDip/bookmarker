const mongoose = require("mongoose");

const bookmarkSchema = require("./bookmarkSchema");
const Bookmark = mongoose.model("Bookmark", bookmarkSchema);

const bundleSchema = require("../bundle/bundleSchema");
const Bundle = mongoose.model("Bundle", bundleSchema);

module.exports.createBookmark = async (req, res) => {
    try {
        const bookmark = new Bookmark(req.body);
        const updatedBundle = await Bundle.findByIdAndUpdate(
            req.params.bundleId,
            {
                $push: { bookmarks: bookmark }
            },
            { new: true }
        );
        return res.status(201).send(bookmark);
    } catch (e) {
        return res.status(404).send({
            error: `Error creating bookmark - ${e.message}`
        });
    }
};

module.exports.modifyBookmark = async (req, res) => {
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
        return res.status(200).send(bundle);
    } catch (e) {
        return res.status(404).send({
            error: `Error modifying bookmark - ${e.message}`
        });
    }
};

module.exports.moveBookmark = async (req, res) => {
    try {
        // check if the new bookmark location is owned by current user
        const newBundle = await Bundle.findById(req.params.newBundleId);
        if (!newBundle) {
            throw new Error("Destination bundle not found.");
        }
        if (newBundle.ownerId !== req.session.user._id) {
            return res
                .status(401)
                .send("You do not have access to this bundle.");
        }

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
        const bookmark = new Bookmark({ ...bookmarkBeforeDelete.bookmarks[0] });

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
        return res.status(200).send([removedFromBundle, addedToBundle]);
    } catch (e) {
        return res.status(404).send({
            error: `Error moving bookmark - ${e.message}`
        });
    }
};

module.exports.deleteBookmark = async (req, res) => {
    try {
        const bookmarkIdObj = mongoose.Types.ObjectId(req.params.bookmarkId);
        const updatedBundle = await Bundle.findByIdAndUpdate(
            req.params.bundleId,
            {
                $pull: {
                    bookmarks: { _id: bookmarkIdObj }
                }
            },
            { new: true }
        );
        return res.status(204).send(updatedBundle);
    } catch (e) {
        return res.status(404).send({
            error: `Error deleting bookmark - ${e.message}`
        });
    }
};
