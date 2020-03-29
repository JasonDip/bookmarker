const mongoose = require("mongoose");

const bundleSchema = require("./bundleSchema");
const Bundle = mongoose.model("Bundle", bundleSchema);

const userSchema = require("../user/userSchema");
const User = mongoose.model("User", userSchema);

module.exports.getBundle = async req => {
    try {
        let bundleId = req.params.bundleId;
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

module.exports.createRootBundle = async req => {
    try {
        const bundle = new Bundle({
            ...req.body,
            ownerId: req.session.user._id
        });
        await bundle.save();
        // add this new root bundle to the user's ownedBundles list
        const modifiedUser = await User.findByIdAndUpdate(
            req.session.user._id,
            {
                $push: {
                    ownedBundles: bundle._id
                }
            },
            { new: true }
        );
        // refresh the session's user object to update with the newly added bundle
        req.session.user = modifiedUser;
        req.session.save();
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

module.exports.modifyBundle = async req => {
    try {
        let bundleId = req.params.bundleId;
        let body = req.body;
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

module.exports.createNestedBundle = async (req, res) => {
    try {
        // check if user owns the parent bundle
        let doesOwn = false;
        for (let bundle of req.session.user.ownedBundles) {
            if (bundle.toString() === req.params.parentBundleId) {
                doesOwn = true;
                break;
            }
        }
        if (!doesOwn) {
            return res
                .status(401)
                .send({ error: "You do not own this bundle." });
        }

        let parentBundleId = req.params.parentBundleId;
        let newBundleObj = req.body;
        // first check if the entered parent bundle is valid
        let parentBundle;
        parentBundle = await Bundle.findById(parentBundleId);
        if (parentBundle._id.toString() !== parentBundleId) {
            throw new Error("Invalid parent bundle.");
        }

        // create the new bundle
        const bundle = new Bundle({
            ...newBundleObj,
            parentBundleId: mongoose.Types.ObjectId(parentBundleId),
            ownerId: mongoose.Types.ObjectId(req.session.user._id)
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

module.exports.deleteBundle = async req => {
    try {
        let bundleId = req.params.bundleId;
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
