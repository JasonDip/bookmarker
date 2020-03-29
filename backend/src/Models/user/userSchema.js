const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error("Email is invalid.");
                }
            }
        },
        hashedPassword: {
            type: String,
            required: true
        },
        ownedCollections: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Bundle"
            }
        ]
    },
    {
        timestamps: true
    }
);

module.exports = userSchema;
