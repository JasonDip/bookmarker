const express = require("express");
const bundle = require("../Models/bundle/bundle");

const router = new express.Router();

// TODO: get all bundles for current user
router.get("/bundles", async (req, res) => {
    // TODO: check user auth

    try {
        res.status(200).send();
    } catch (e) {
        res.status(404).send({ error: e.message });
    }
});

/*  get a bundle  */
router.get("/bundles/:bundleId", async (req, res) => {
    // TODO: check user auth

    const result = await bundle.getBundle(req.params.bundleId);

    if (result.success) {
        res.status(200).send(result.message);
    } else {
        res.status(404).send({ error: result.error.message });
    }
});

/*  create a new root bundle  */
router.post("/bundles", async (req, res) => {
    // TODO: make sure user is logged in

    const result = await bundle.createRootBundle(req.body);

    // TODO: should the User have a list of owned bundles?

    if (result.success) {
        res.status(201).send(result.message);
    } else {
        res.status(404).send({ error: result.error.message });
    }
});

/*  modify an existing bundle  */
router.patch("/bundles/:bundleId", async (req, res) => {
    // TODO: need to check auth on both current bundle and new parent bundle

    const result = await bundle.modifyBundle(req.params.bundleId, req.body);

    if (result.success) {
        res.status(200).send(result.message);
    } else {
        res.status(404).send({ error: result.error.message });
    }
});

/*  create a new bundle inside another bundle (nested bundle)  */
router.post("/bundles/:parentBundleId", async (req, res) => {
    // TODO: check user auth of parent bundle

    const result = await bundle.createNestedBundle(
        req.params.parentBundleId,
        req.body
    );

    if (result.success) {
        res.status(201).send(result.message);
    } else {
        res.status(404).send({ error: result.error.message });
    }
});

/*  delete a bundle  */
router.delete("/bundles/:bundleId", async (req, res) => {
    // TODO: check user auth for bundle

    const result = await bundle.deleteBundle(req.params.bundleId);

    if (result.success) {
        res.status(204).send();
    } else {
        res.status(404).send({ error: result.error.message });
    }
});

module.exports = router;
