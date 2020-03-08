const express = require("express");
const mongoose = require("mongoose");
const bundleSchema = require("./bundleSchema");

const router = new express.Router();

const Bundle = mongoose.model("Bundle", bundleSchema);

// TODO: get all bundles for current user
router.get("/bundles", async (req, res) => {
    // TODO: check user auth

    try {
        res.status(200).send();
    } catch (e) {
        res.status(404).send({ error: e.message });
    }
});

// get a bundle
router.get("/bundles/:bundleId", async (req, res) => {
    // TODO: check user auth

    try {
        const bundle = await Bundle.findById(req.params.bundleId);
        if (bundle._id.toString() !== req.params.bundleId) {
            throw new Error("Invalid bundle Id.");
        }
        res.status(200).send(bundle);
    } catch (e) {
        res.status(404).send({ error: e.message });
    }
});

// create a new root bundle
router.post("/bundles", async (req, res) => {
    // TODO: make sure user is logged in

    const bundle = new Bundle({
        name: req.body.name,
        note: req.body.note,
        //ownerId: // TODO: add this in when userid+auth is ready
        bookmarks: req.body.bookmarks
    });

    try {
        await bundle.save();
        res.status(201).send(bundle);
    } catch (e) {
        res.status(404).send({ error: e.message });
    }
});

// modify an existing bundle
router.patch("/bundles/:bundleId", async (req, res) => {
    try {
        // TODO: need to check auth on both current bundle and new parent bundle

        // if attempting to change parent bundle, first make sure new parent is valid
        let newParent;
        if (req.body.parentBundleId) {
            newParent = await Bundle.findById(req.body.parentBundleId);

            if (newParent._id.toString() !== req.body.parentBundleId) {
                throw new Error("Invalid parent.");
            }
        }

        const bundle = await Bundle.findByIdAndUpdate(
            req.params.bundleId,
            {
                name: req.body.name,
                note: req.body.note,
                parentBundleId: req.body.parentBundleId
            },
            {
                new: true,
                runValidators: true
            }
        );

        // update the parent's childBundleIds array to reflect new relationship
        if (req.body.parentBundleId) {
            await Bundle.updateOne(
                { _id: newParent.parentBundleId },
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
});

// create a new bundle inside another bundle (nested bundle)
router.post("/bundles/:parentBundleId", async (req, res) => {
    // TODO: check user auth of parent bundle

    // first check if the entered parent bundle is valid
    let parentBundle;
    try {
        parentBundle = await Bundle.findById(req.params.parentBundleId);
        if (parentBundle._id.toString() !== req.params.parentBundleId) {
            throw new Error("Invalid parent bundle.");
        }
    } catch (e) {
        return res.status(404).send({ error: e.message });
    }

    const bundle = new Bundle({
        ...req.body,
        parentBundleId: mongoose.Types.ObjectId(req.params.parentBundleId)
    });

    try {
        await bundle.save();
        // update the parents bundle's childBundleIds array to reflect new relationship
        await Bundle.updateOne(
            { _id: mongoose.Types.ObjectId(parentBundle._id) },
            {
                $push: { childBundleIds: mongoose.Types.ObjectId(bundle._id) }
            }
        );
        res.status(201).send(bundle);
    } catch (e) {
        res.status(404).send({ error: e.message });
    }
});

// delete a bundle
router.delete("/bundles/:bundleId", async (req, res) => {
    // TODO: check user auth for bundle

    try {
        await Bundle.findByIdAndDelete(req.params.bundleId);
        res.status(204).send();
    } catch (e) {
        res.status(404).send({ error: e.message });
    }
});

module.exports = router;
