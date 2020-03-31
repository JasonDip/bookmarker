/*  checks the user's session to see if the user is logged in  */
module.exports = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        res.status(401).send({ error: "Not logged in." });
    } else {
        next();
    }
};
