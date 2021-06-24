/*  adds headers to allow CORS  */
module.exports = (req, res, next) => {
    // need to set allow-origin with specific domain and allow-credentials
    // or else cross domain cookies will not work
    //res.setHeader("Access-Control-Allow-Origin", "*");

    // https://stackoverflow.com/questions/24897801/enable-access-control-allow-origin-for-multiple-domains-in-node-js
    const allowedOrigins = ['https://www.bookmarker.jasondip.com', 'https://bookmarker.jasondip.com'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    
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
