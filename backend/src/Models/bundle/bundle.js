const mongoose = require("mongoose");

const bundleSchema = require("./bundleSchema");
const Bundle = mongoose.model("Bundle", bundleSchema);

const userSchema = require("../user/userSchema");
const User = mongoose.model("User", userSchema);

module.exports.getBundle = async (req, res) => {
    try {
        let bundleId = req.params.bundleId;
        const bundle = await Bundle.findById(bundleId);
        if (!bundle) {
            throw new Error("Unable to find bundle.");
        }
        if (
            bundle.isPrivate &&
            (!req.session.isLoggedIn ||
                req.session.user._id.toString() !== bundle.ownerId.toString())
        ) {
            // private bundles require authentication
            return res.status(401).send({
                error: "You do not have permission to access this bundle."
            });
        }
        res.status(200).send(bundle);
    } catch (e) {
        res.status(404).send({ error: e.message });
    }
};

module.exports.createRootBundle = async (req, res) => {
    try {
        // create new root bundle
        const bundle = new Bundle({
            ...req.body,
            isRoot: true,
            ownerId: req.session.user._id
        });
        await bundle.save();
        // add this new root bundle to the user's ownedCollections list
        const modifiedUser = await User.findByIdAndUpdate(
            req.session.user._id,
            {
                $push: {
                    ownedCollections: bundle._id
                }
            },
            { new: true }
        );
        // refresh the session's user object to update with the newly added bundle
        req.session.user = modifiedUser;
        req.session.save();
        res.status(201).send(bundle);
    } catch (e) {
        res.status(404).send({ error: e.message });
    }
};

module.exports.modifyBundle = async (req, res) => {
    try {
        // saving old parent
        let oldParent = req.session.specifiedBundle;

        // if attempting to change this bundle's parent bundle, first make sure new parent is valid
        let newParent;
        if (req.body.parentBundleId) {
            // do not allow root bundles (collections) to be nested
            if (req.session.specifiedBundle.isRoot) {
                return res
                    .status(401)
                    .send({ error: "Cannot nest root bundles." });
            }

            newParent = await Bundle.findById(req.body.parentBundleId);

            if (!newParent) {
                throw new Error("Specified parent was not found.");
            }

            // make sure current user is owner of the new parent bundle
            if (!req.session.user._id === newParent._id.toString()) {
                return res
                    .status(401)
                    .send({ error: "You are not owner of the parent bundle." });
            }
        }

        // find bundle and update
        const bundle = await Bundle.findByIdAndUpdate(
            req.params.bundleId,
            { ...req.body },
            {
                new: true,
                runValidators: true
            }
        );

        if (req.body.parentBundleId) {
            // update the old parent's childBundleIds array to remove old child
            await Bundle.updateOne(
                { _id: oldParent.parentBundleId },
                {
                    $pull: {
                        childBundleIds: mongoose.Types.ObjectId(bundle._id)
                    }
                }
            );

            // update the new parent's childBundleIds array to add new child
            await Bundle.updateOne(
                { _id: newParent._id },
                {
                    $push: {
                        childBundleIds: mongoose.Types.ObjectId(bundle._id)
                    }
                }
            );
        }
        res.status(200).send(bundle);
    } catch (e) {
        res.status(404).send({ error: e.message });
    }
};

module.exports.createNestedBundle = async (req, res) => {
    try {
        // check if the entered parent bundle is valid
        let parentBundle = await Bundle.findById(req.params.bundleId);
        if (!parentBundle) {
            throw new Error("Bundle not found.");
        }
        if (
            parentBundle.ownerId.toString() !== req.session.user._id.toString()
        ) {
            return res
                .status(401)
                .send({ error: "You do not own this bundle." });
        }

        // create the new bundle
        const newBundle = new Bundle({
            ...req.body,
            parentBundleId: mongoose.Types.ObjectId(req.params.bundleId),
            ownerId: mongoose.Types.ObjectId(req.session.user._id)
        });
        await newBundle.save();

        // update the parent bundle's childBundleIds array with new bundle's id
        await Bundle.updateOne(
            { _id: mongoose.Types.ObjectId(req.params.bundleId) },
            {
                $push: {
                    childBundleIds: mongoose.Types.ObjectId(newBundle._id)
                }
            }
        );
        res.status(201).send(newBundle);
    } catch (e) {
        res.status(404).send({ error: e.message });
    }
};

module.exports.deleteBundle = async (req, res) => {
    // utility function for recursively deleting children bundles
    let deleteUtil = async childBundleIds => {
        try {
            for (let childId of childBundleIds) {
                const bundle = await Bundle.findByIdAndDelete(childId);
                deleteUtil(bundle.childBundleIds);
            }
        } catch {
            throw new Error("Error deleting a child bundle.");
        }
    };

    try {
        // delete the current bundle
        const bundle = await Bundle.findByIdAndDelete(req.params.bundleId);
        if (!bundle) throw new Error("Bundle is null.");

        if (bundle.isRoot) {
            // delete entry from user's ownedCollections if it is a root bundle
            const updatedUser = await User.findByIdAndUpdate(
                bundle.ownerId,
                {
                    $pull: {
                        ownedCollections: bundle._id
                    }
                },
                { new: true }
            );
            // refresh session data
            req.session.user = updatedUser;
            req.session.save();
        } else {
            // delete entry from parent bundle if it is a nested bundle
            await Bundle.findByIdAndUpdate(bundle.parentBundleId, {
                $pull: { childBundleIds: bundle._id }
            });
        }

        // recursively delete all children bundles
        deleteUtil(bundle.childBundleIds);

        res.status(204).send();
    } catch (e) {
        res.status(404).send({ error: e.message });
    }
};
