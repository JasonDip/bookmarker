const mongoose = require("mongoose");
const bundleSchema = require("../bundle/bundleSchema");
const Bundle = mongoose.model("Bundle", bundleSchema);

/**
 * utility function for recursively populating all bundles in collection
 * @param {Bundle[]} fullCollection
 * @param {ObjectId[]} childBundleIds
 */
module.exports.populateUtil = async (fullCollection, childBundleIds) => {
    for (let childId of childBundleIds) {
        const childBundle = await Bundle.findById(childId);
        fullCollection.push(childBundle);
        if (childBundle.childBundleIds.length > 0) {
            await populateUtil(
                fullCollection,
                new Array(childBundle.childBundleIds)
            );
        }
    }
};

/**
 * utility function for recursively deleting children bundles
 * @param {ObjectId[]} childBundleIds
 */
module.exports.deleteUtil = async childBundleIds => {
    try {
        for (let childId of childBundleIds) {
            const bundle = await Bundle.findByIdAndDelete(childId);
            if (bundle.childBundleIds.length === 0) continue;
            deleteUtil(bundle.childBundleIds);
        }
    } catch {
        throw new Error("Error deleting a child bundle.");
    }
};
