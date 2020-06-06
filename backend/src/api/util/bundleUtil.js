const { Bundle } = require("../bundle/model");

/**
 * utility function for recursively getting all bundles in a collection
 * @param {Bundle[]} fullCollection
 * @param {ObjectId[]} childBundleIds
 */
const populateUtil = async (fullCollection, childBundleIds) => {
    try {
        if (childBundleIds.length === 0) return;
        for (let childId of childBundleIds) {
            const childBundle = await Bundle.findById(childId);
            fullCollection.push(childBundle);
            if (childBundle.childBundleIds.length > 0) {
                await populateUtil(fullCollection, childBundle.childBundleIds);
            }
        }
    } catch (e) {
        e.name = "Error PopulateUtil";
        e.statusCode = 500;
        throw e;
    }
};
module.exports.populateUtil = populateUtil;

/**
 * utility function for recursively deleting children bundles
 * @param {ObjectId[]} childBundleIds
 */
const deleteUtil = async (childBundleIds) => {
    try {
        if (childBundleIds.length === 0) return;
        for (let childId of childBundleIds) {
            const bundle = await Bundle.findByIdAndDelete(childId);
            if (bundle.childBundleIds.length > 0) {
                await deleteUtil(bundle.childBundleIds);
            }
        }
    } catch (e) {
        e.name = "Error DeleteUtil";
        e.statusCode = 500;
        throw e;
    }
};
module.exports.deleteUtil = deleteUtil;
