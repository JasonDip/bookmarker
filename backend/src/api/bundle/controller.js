const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bundleUtil = require("../util/bundleUtil");
const { Bundle } = require("./model");
const { User } = require("../user/model");

module.exports.getCollection = async (req, res, next) => {
    try {
        // need to search bundle here since we are not using middleware
        const collection = await Bundle.findById(req.params.bundleId);
        if (!collection) {
            const error = new Error("Bundle does not exist.");
            error.statusCode = 404;
            throw error;
        }
        // only root-bundles/collections are allowed to be fully populated
        // this is by design. only collections' privacy setting matters.
        // TODO: maybe just search for root bundle and use that privacy setting?
        if (!collection.isRoot) {
            const error = new Error("Only collections can be populated.");
            error.statusCode = 404;
            throw error;
        }

        // private collections need authentication
        if (collection.isPrivate) {
            // check the session if user is logged in
            if (!req.session.isLoggedIn) {
                let error = new Error("Not logged in.");
                error.name = "Authentication Error";
                error.statusCode = 401;
                return next(error);
            }
            if (!req.session.user) {
                let error = new Error("Session has no user logged.");
                error.name = "Authentication Error";
                error.statusCode = 401;
                return next(error);
            }
            if (!req.session.user._id) {
                let error = new Error("Session has no user id logged.");
                error.name = "Authentication Error";
                error.statusCode = 401;
                return next(error);
            }

            // get the access token from header
            const authHeader = req.get("Authorization");
            if (!authHeader) {
                const error = new Error("Not authenticated.");
                error.name = "Authentication Error";
                error.statusCode = 401;
                return next(error);
            }
            const token = authHeader.split(" ")[1];

            // check the access token
            let decodedToken;
            try {
                decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            } catch (e) {
                e.statusCode = 401;
                e.name = "Authentication Error";
                return next(e);
            }
            if (!decodedToken) {
                const error = new Error("Not authenticated.");
                error.statusCode = 401;
                error.name = "Authentication Error";
                return next(error);
            }
            if (decodedToken._id !== req.session.user._id.toString()) {
                const error = new Error("Id mismatch.");
                error.statusCode = 401;
                error.name = "Authentication Error";
                return next(error);
            }

            // if authenticated, check if user owns this collection
            if (
                req.session.user._id.toString() !==
                collection.ownerId.toString()
            ) {
                const error = new Error(
                    "You do not have permission to access this collection."
                );
                error.statusCode = 401;
                throw error;
            }
        }

        // populate the collection and its children
        let fullCollection = [];
        fullCollection.push(collection);
        await bundleUtil.populateUtil(
            fullCollection,
            collection.childBundleIds
        );
        return res.status(200).send(fullCollection);
    } catch (e) {
        e.name = "Get Collection Error";
        e.statusCode = e.statusCode || 500;
        return next(e);
    }
};

module.exports.createRootBundle = async (req, res, next) => {
    try {
        // create new root bundle
        const bundle = new Bundle({
            ...req.body,
            isRoot: true,
            ownerId: req.session.user._id.toString()
        });
        await bundle.save();
        // add this new root bundle to the user's ownedCollections list
        const modifiedUser = await User.findByIdAndUpdate(
            req.session.user._id.toString(),
            {
                $push: {
                    ownedCollections: bundle._id
                }
            },
            { new: true }
        );
        return res.status(201).send(bundle);
    } catch (e) {
        e.name = "Create Root Bundle Error";
        e.statusCode = 500;
        return next(e);
    }
};

module.exports.modifyBundle = async (req, res, next) => {
    try {
        // cache old parent temporarily
        let oldParent = req.specifiedBundle;

        // if attempting to change this bundle's parent bundle, first make sure new parent is valid
        let newParent;
        let newRoot;
        if (req.body.parentBundleId) {
            // do not allow root bundles (collections) to be nested
            if (req.specifiedBundle.isRoot) {
                const error = new Error("Cannot nest root bundles.");
                error.statusCode = 401;
                throw error;
            }

            newParent = await Bundle.findById(req.body.parentBundleId);
            newRoot = newParent.rootBundleId;

            if (!newParent) {
                const error = new Error("Specified parent was not found.");
                error.statusCode = 404;
                throw error;
            }

            // make sure current user is owner of the new parent bundle
            if (!req.session.user._id.toString() === newParent._id.toString()) {
                const error = new Error(
                    "You are not owner of the parent bundle."
                );
                error.statusCode = 401;
                throw error;
            }
        }

        // find bundle and update
        const bundle = await Bundle.findByIdAndUpdate(
            req.params.bundleId,
            { ...req.body, rootBundleId: newRoot },
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
        return res.status(200).send(bundle);
    } catch (e) {
        e.statusCode = e.statusCode || 500;
        e.name = "Modify Bundle Error";
        return next(e);
    }
};

module.exports.createNestedBundle = async (req, res, next) => {
    try {
        // check if the entered parent bundle is valid
        let parentBundle = await Bundle.findById(req.params.bundleId);
        if (!parentBundle) {
            const error = new Error("Bundle not found.");
            error.statusCode = 404;
            throw error;
        }
        if (
            parentBundle.ownerId.toString() !== req.session.user._id.toString()
        ) {
            const error = new Error("You do not own this bundle.");
            error.statusCode = 401;
            throw error;
        }

        // get the root bundle
        let root;
        if (parentBundle.isRoot) {
            root = parentBundle._id;
        } else {
            root = parentBundle.rootBundleId;
        }

        // create the new bundle
        const newBundle = new Bundle({
            ...req.body,
            parentBundleId: mongoose.Types.ObjectId(req.params.bundleId),
            ownerId: req.session.user._id,
            rootBundleId: root
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
        return res.status(201).send(newBundle);
    } catch (e) {
        e.statusCode = e.statusCode || 500;
        e.name = "Create Nested Bundle Error";
        return next(e);
    }
};

module.exports.deleteBundle = async (req, res, next) => {
    try {
        // delete the current bundle
        const bundle = await Bundle.findByIdAndDelete(req.params.bundleId);
        if (!bundle) {
            const error = new Error("Bundle is null.");
            error.statusCode = 404;
            throw error;
        }

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
        } else {
            // delete entry from parent bundle if it is a nested bundle
            await Bundle.findByIdAndUpdate(bundle.parentBundleId, {
                $pull: { childBundleIds: bundle._id }
            });
        }

        // recursively delete all children bundles
        bundleUtil.deleteUtil(bundle.childBundleIds);

        return res.status(204).send();
    } catch (e) {
        e.statusCode = e.statusCode || 500;
        e.name = "Delete Bundle Error";
        return next(e);
    }
};
