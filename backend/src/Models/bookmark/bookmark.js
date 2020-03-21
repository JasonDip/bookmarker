const mongoose = require("mongoose");

const bookmarkSchema = require("../bookmark/bookmarkSchema");
const Bookmark = mongoose.model("Bookmark", bookmarkSchema);

const bundleSchema = require("../bundle/bundleSchema");
const Bundle = mongoose.model("Bundle", bundleSchema);

module.exports.createBookmark = async (BundleId, bookmarkObj) => {
    try {
        const bookmark = new Bookmark(bookmarkObj);
        const updatedBundle = await Bundle.findByIdAndUpdate(
            BundleId,
            {
                $push: { bookmarks: bookmark }
            },
            { new: true }
        );
        return {
            success: true,
            message: bookmark // maybe return the updated bundle instead?
        };
    } catch (e) {
        return {
            success: false,
            error: e
        };
    }
};

module.exports.modifyBookmark = async (bundleId, bookmarkId, bookmarkObj) => {
    try {
        await Bundle.updateOne(
            {
                _id: bundleId,
                "bookmarks._id": bookmarkId
            },
            {
                $set: {
                    "bookmarks.$.name": bookmarkObj.name,
                    "bookmarks.$.url": bookmarkObj.url,
                    "bookmarks.$.note": bookmarkObj.note
                }
            }
        );
        const bundle = await Bundle.findById(bundleId); // TODO: is returning bundle needed?
        return {
            success: true,
            message: bundle
        };
    } catch (e) {
        return {
            success: false,
            error: e
        };
    }
};

module.exports.moveBookmark = async (bundleId, bookmarkId, newBundleId) => {
    try {
        // get the bookmark
        const bookmarkBeforeDelete = await Bundle.findOne({
            _id: bundleId
        }).select({
            bookmarks: {
                $elemMatch: {
                    _id: bookmarkId
                }
            }
        });
        const bookmark = new Bookmark({ ...bookmarkBeforeDelete.bookmarks[0] });

        // add bookmark to newBundleId
        const addedToBundle = await Bundle.findByIdAndUpdate(
            newBundleId,
            {
                $push: {
                    bookmarks: bookmark
                }
            },
            { new: true }
        );

        // delete bookmark from bundleId
        const removedFromBundle = await Bundle.findByIdAndUpdate(
            bundleId,
            {
                $pull: {
                    bookmarks: { _id: bookmarkId }
                }
            },
            { new: true }
        );
        return {
            success: true,
            message: [removedFromBundle, addedToBundle]
        };
    } catch (e) {
        return {
            success: false,
            error: e
        };
    }
};

module.exports.deleteBookmark = async (bundleId, bookmarkId) => {
    try {
        const bookmarkIdObj = mongoose.Types.ObjectId(bookmarkId);
        const updatedBundle = await Bundle.findByIdAndUpdate(
            bundleId,
            {
                $pull: {
                    bookmarks: { _id: bookmarkIdObj }
                }
            },
            { new: true }
        );
        return {
            success: true,
            message: updatedBundle
        };
    } catch (e) {
        return {
            success: false,
            error: e
        };
    }
};
