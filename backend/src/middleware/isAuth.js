const jwt = require("jsonwebtoken");

/*  checks authentication token in header  */
module.exports = (req, res, next) => {
    req.user = {}; // always have a user obj
    const authHeader = req.get("Authorization");
    if (!authHeader) {
        const error = new Error("Not authenticated.");
        error.name = "Authentication Error";
        error.statusCode = 401;
        return next(error);
    }
    const token = authHeader.split(" ")[1];
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
    req.user._id = decodedToken._id;
    next();
};
