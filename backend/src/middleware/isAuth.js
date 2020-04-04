const jwt = require("jsonwebtoken");

/*  checks authentication token in header  */
module.exports = (req, res, next) => {
    // check the session if user is logged in
    if (!req.session.isLoggedIn) {
        let error = new Error("Not logged in.");
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

    next();
};
