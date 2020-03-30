const express = require("express");
const bundle = require("./bundle");
const isLoggedIn = require("../../middlewares/isLoggedIn");
const ownsBundle = require("../../middlewares/ownsBundle");

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
/*  note: no auth is needed to get bundle because it depends on the bundle's privacy setting  */
router.get("/bundles/:bundleId", bundle.getCollection);

/*  create a new root bundle  */
router.post("/bundles", isLoggedIn, bundle.createRootBundle);

/*  modify an existing bundle  */
router.patch("/bundles/:bundleId", isLoggedIn, ownsBundle, bundle.modifyBundle);

/*  create a nested bundle  */
router.post("/bundles/:bundleId", isLoggedIn, bundle.createNestedBundle);

/*  delete a bundle  */
router.delete(
    "/bundles/:bundleId",
    isLoggedIn,
    ownsBundle,
    bundle.deleteBundle
);

module.exports = router;