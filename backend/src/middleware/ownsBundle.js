const { Bundle } = require("../api/bundle/model");

/*  check if the user owns the bundle specified by req.params.bundleId  */
/*  must be logged in  */
module.exports = async (req, res, next) => {
    try {
        const bundle = await Bundle.findById(req.params.bundleId);
        if (!bundle) {
            const error = new Error("Bundle does not exist.");
            throw error;
        }
        if (bundle.ownerId.toString() !== req.session.user._id.toString()) {
            const error = new Error("You do not own this bundle.");
            throw error;
        }
        req.specifiedBundle = bundle;
        return next();
    } catch (e) {
        e.statusCode = e.statusCode || 401;
        e.name = "Owns Bundle Error";
        return next(e);
    }
};
