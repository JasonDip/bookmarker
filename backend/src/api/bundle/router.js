const express = require("express");
const controller = require("./controller");
const isLoggedIn = require("../../middleware/isLoggedIn");
const ownsBundle = require("../../middleware/ownsBundle");

const router = new express.Router();

/*  get a bundle  */
/*  note: no auth is needed to get bundle because it depends on the bundle's privacy setting  */
router.get("/bundles/:bundleId", controller.getCollection);

/*  create a new root bundle  */
router.post("/bundles", isLoggedIn, controller.createRootBundle);

/*  modify an existing bundle  */
router.patch(
    "/bundles/:bundleId",
    isLoggedIn,
    ownsBundle,
    controller.modifyBundle
);

/*  create a nested bundle  */
router.post("/bundles/:bundleId", isLoggedIn, controller.createNestedBundle);

/*  delete a bundle  */
router.delete(
    "/bundles/:bundleId",
    isLoggedIn,
    ownsBundle,
    controller.deleteBundle
);

module.exports = router;
