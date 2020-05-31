/*  adds headers to allow CORS  */
module.exports = (req, res, next) => {
    //res.setHeader("Access-Control-Allow-Origin", "*");
    // need to set allow-origin with specific domain and allow-credentials
    // or else cross domain cookies will not work
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3001");
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
