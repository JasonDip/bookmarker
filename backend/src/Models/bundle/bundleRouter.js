const express = require("express");
const bundle = require("./bundle");
const isLoggedIn = require("../../middlewares/isLoggedIn");

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
/*  note: no authentication middleware is needed here because it depends on the bundle's privacy setting  */
router.get("/bundles/:bundleId", async (req, res) => {
    // TODO: check bundle privacy setting

    const result = await bundle.getBundle(req);

    if (result.success) {
        res.status(200).send(result.message);
    } else {
        res.status(404).send({ error: result.error.message });
    }
});

/*  create a new root bundle  */
router.post("/bundles", isLoggedIn, async (req, res) => {
    const result = await bundle.createRootBundle(req);

    if (result.success) {
        res.status(201).send(result.message);
    } else {
        res.status(404).send({ error: result.error.message });
    }
});

/*  modify an existing bundle  */
router.patch("/bundles/:bundleId", isLoggedIn, async (req, res) => {
    // check if current user is owner of the bundle being modified
    if (req.session.ownedBundles.includes(req.params.bundleId)) {
        return res
            .status(401)
            .send({ error: "You are not owner of the bundle." });
    }

    // check if they are attempting to modify the parent bundle
    // if so, they need to be owner of the new parent bundle
    if (
        req.body.parentBundleId &&
        !req.session.ownedBundles.includes(req.body.parentBundleId)
    ) {
        return res
            .status(401)
            .send({ error: "You are not owner of the parent bundle." });
    }

    const result = await bundle.modifyBundle(req);

    if (result.success) {
        res.status(200).send(result.message);
    } else {
        res.status(404).send({ error: result.error.message });
    }
});

/*  create a nested bundle  */
router.post("/bundles/:parentBundleId", isLoggedIn, async (req, res) => {
    const result = await bundle.createNestedBundle(req, res);

    if (result.success) {
        res.status(201).send(result.message);
    } else {
        res.status(404).send({ error: result.error.message });
    }
});

/*  delete a bundle  */
router.delete("/bundles/:bundleId", isLoggedIn, async (req, res) => {
    // check if user owns the bundle
    if (!req.session.user.ownedBundles.includes(req.params.bundleId)) {
        return res.status(401).send({ error: "You do not own this bundle." });
    }

    const result = await bundle.deleteBundle(req);

    if (result.success) {
        res.status(204).send();
    } else {
        res.status(404).send({ error: result.error.message });
    }
});

module.exports = router;
