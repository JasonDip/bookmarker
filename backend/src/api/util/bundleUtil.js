const { Bundle } = require("../bundle/model");

/**
 * utility function for recursively getting all bundles in a collection
 * @param {Bundle[]} fullCollection
 * @param {ObjectId[]} childBundleIds
 */
module.exports.populateUtil = async (fullCollection, childBundleIds) => {
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

/**
 * utility function for recursively deleting children bundles
 * @param {ObjectId[]} childBundleIds
 */
module.exports.deleteUtil = async childBundleIds => {
    try {
        if (childBundleIds.length === 0) return;
        for (let childId of childBundleIds) {
            const bundle = await Bundle.findByIdAndDelete(childId);
            if (bundle.childBundleIds.length === 0) continue;
            this.deleteUtil(bundle.childBundleIds);
        }
    } catch (e) {
        e.name = "Error DeleteUtil";
        e.statusCode = 500;
        throw e;
    }
};
