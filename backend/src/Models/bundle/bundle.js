const mongoose = require("mongoose");

const bundleSchema = require("./bundleSchema");
const Bundle = mongoose.model("Bundle", bundleSchema);

module.exports.getBundle = async bundleId => {
    try {
        const bundle = await Bundle.findById(bundleId);
        if (bundle._id.toString() !== bundleId) {
            throw new Error("Invalid bundle Id.");
        }
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

module.exports.createRootBundle = async bundleObj => {
    try {
        const bundle = new Bundle(bundleObj);
        await bundle.save();
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

module.exports.modifyBundle = async (bundleId, body) => {
    try {
        // if attempting to change this bundle's parent bundle, first make sure new parent is valid
        let newParent;
        if (body.parentBundleId) {
            newParent = await Bundle.findById(body.parentBundleId);

            if (newParent._id.toString() !== body.parentBundleId) {
                throw new Error("Invalid parent.");
            }
        }

        const bundle = await Bundle.findByIdAndUpdate(
            bundleId,
            {
                name: body.name,
                note: body.note,
                parentBundleId: body.parentBundleId
            },
            {
                new: true,
                runValidators: true
            }
        );

        // update the parent's childBundleIds array to reflect new relationship
        if (body.parentBundleId) {
            await Bundle.updateOne(
                { _id: newParent.parentBundleId },
                {
                    $push: {
                        childBundleIds: mongoose.Types.ObjectId(bundle._id)
                    }
                }
            );
        }
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

module.exports.createNestedBundle = async (parentBundleId, newBundleObj) => {
    // first check if the entered parent bundle is valid
    let parentBundle;
    try {
        parentBundle = await Bundle.findById(parentBundleId);
        if (parentBundle._id.toString() !== parentBundleId) {
            throw new Error("Invalid parent bundle.");
        }
    } catch (e) {
        return {
            success: false,
            error: e
        };
    }

    try {
        const bundle = new Bundle({
            ...newBundleObj,
            parentBundleId: mongoose.Types.ObjectId(parentBundleId)
        });

        await bundle.save();
        // update the parent bundle's childBundleIds array to reflect new relationship
        await Bundle.updateOne(
            { _id: mongoose.Types.ObjectId(parentBundle._id) },
            {
                $push: { childBundleIds: mongoose.Types.ObjectId(bundle._id) }
            }
        );
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

module.exports.deleteBundle = async bundleId => {
    try {
        await Bundle.findByIdAndDelete(bundleId);
        return {
            success: true
        };
    } catch (e) {
        return {
            success: false,
            error: e
        };
    }
};
