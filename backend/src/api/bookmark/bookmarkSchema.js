const mongoose = require("mongoose");

const bookmarkSchema = new mongoose.Schema(
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

module.exports = bookmarkSchema;
