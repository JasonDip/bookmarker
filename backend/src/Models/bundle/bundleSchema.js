const mongoose = require("mongoose");
const bookmarkSchema = require("../bookmark/bookmarkSchema");

const bundleSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        note: {
            type: String
        },
        ownerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        parentBundleId: {
            type: mongoose.Schema.Types.ObjectId
        },
        childBundleIds: {
            type: [mongoose.Schema.Types.ObjectId]
        },
        bookmarks: {
            type: [bookmarkSchema]
        },
        isRoot: {
            type: Boolean,
            default: false
        },
        isPrivate: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = bundleSchema;
