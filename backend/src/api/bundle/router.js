const express = require("express");
const controller = require("./controller");
const isAuth = require("../../middleware/isAuth");
const ownsBundle = require("../../middleware/ownsBundle");

const router = new express.Router();

/*  get a collection  */
/*  note: no auth is needed to get collection (root bundle) because it depends on the bundle's privacy setting  */
router.get("/bundles/:bundleId", controller.getCollection);

/*  create a new root bundle  */
router.post("/bundles", isAuth, controller.createRootBundle);

/*  modify an existing bundle  */
router.patch("/bundles/:bundleId", isAuth, ownsBundle, controller.modifyBundle);

/*  create a nested bundle  */
router.post("/bundles/:bundleId", isAuth, controller.createNestedBundle);

/*  delete a bundle  */
router.delete(
    "/bundles/:bundleId",
    isAuth,
    ownsBundle,
    controller.deleteBundle
);

module.exports = router;
