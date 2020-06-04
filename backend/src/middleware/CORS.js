/*  adds headers to allow CORS  */
module.exports = (req, res, next) => {
    // need to set allow-origin with specific domain and allow-credentials
    // or else cross domain cookies will not work
    //res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Origin", process.env.CLIENT_DOMAIN);
    res.setHeader("Access-Control-Allow-Credentials", "true");

    res.setHeader(
        "Access-Control-Allow-Methods",
        "OPTIONS, GET, POST, PATCH, DELETE"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
    );
    next();
};
