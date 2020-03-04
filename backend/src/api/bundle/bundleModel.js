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
        // ownerId: { // TODO: add this back once userid+auth is ready
        //     type: mongoose.Schema.Types.ObjectId,
        //      ref
        //     required: true
        // },
        parentBundleId: {
            type: mongoose.Schema.Types.ObjectId
        },
        childBundleIds: {
            type: [mongoose.Schema.Types.ObjectId]
        },
        bookmarks: {
            type: [bookmarkSchema]
        }
    },
    {
        timestamps: true
    }
);

const Bundle = mongoose.model("Bundle", bundleSchema);

module.exports = Bundle;
