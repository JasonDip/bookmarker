const mongoose = require("mongoose");
const { Bookmark } = require("./model");
const { Bundle } = require("../bundle/model");

module.exports.createBookmark = async (req, res, next) => {
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
        e.statusCode = e.statusCode || 500;
        e.name = "Create Bookmark Error";
        return next(e);
    }
};

module.exports.modifyBookmark = async (req, res, next) => {
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
        e.statusCode = e.statusCode || 500;
        e.name = "Modify Bookmark Error";
        return next(e);
    }
};

module.exports.moveBookmark = async (req, res, next) => {
    try {
        // check if the new bookmark location is owned by current user
        const newBundle = await Bundle.findById(req.params.newBundleId);
        if (!newBundle) {
            const error = new Error("Destination bundle not found.");
            error.statusCode = 404;
            throw error;
        }
        if (newBundle.ownerId.toString() !== req.session.user._id.toString()) {
            const error = new Error("You do not have access to this bundle.");
            error.statusCode = 401;
            throw error;
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
        if (bookmarkBeforeDelete.bookmarks.length === 0) {
            const error = new Error("Could not find bookmark.");
            error.statusCode = 404;
            throw error;
        }
        const bookmark = new Bookmark({
            ...bookmarkBeforeDelete.bookmarks[0]._doc
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
        return res.status(200).send([removedFromBundle, addedToBundle]);
    } catch (e) {
        e.statusCode = e.statusCode || 500;
        e.name = "Move Bookmark Error";
        return next(e);
    }
};

module.exports.deleteBookmark = async (req, res, next) => {
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
        e.statusCode = e.statusCode || 500;
        e.name = "Delete Bookmark Error";
        return next(e);
    }
};
