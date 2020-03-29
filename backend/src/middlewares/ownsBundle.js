const mongoose = require("mongoose");
const bundleSchema = require("../models/bundle/bundleSchema");
const Bundle = mongoose.model("Bundle", bundleSchema);

module.exports = async (req, res, next) => {
    // check if user owns the bundle
    try {
        const bundle = await Bundle.findById(req.params.bundleId);
        if (bundle.ownerId.toString() === req.session.user._id.toString()) {
            return next();
        } else {
            throw new Error("You do not own this bundle.");
        }
    } catch (e) {
        res.status(401).send({ error: e.message });
    }
};
