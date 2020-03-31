const mongoose = require("mongoose");

module.exports.bookmarkSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
        note: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

module.exports.Bookmark = mongoose.model("Bookmark", this.bookmarkSchema);
