const { Bundle } = require("../app/bundle/model");

/*  check if the user owns the bundle specified by req.params.bundleId  */
/*  must be logged in  */
module.exports = async (req, res, next) => {
    try {
        const bundle = await Bundle.findById(req.params.bundleId);
        if (bundle.ownerId.toString() === req.session.user._id.toString()) {
            req.session.specifiedBundle = bundle;
            req.session.save();
            return next();
        } else {
            throw new Error("You do not own this bundle.");
        }
    } catch (e) {
        res.status(401).send({ error: e.message });
    }
};
