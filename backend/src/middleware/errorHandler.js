/*  sends error messages  */
module.exports = (err, req, res, next) => {
    console.log(err);
    const status = err.statusCode || 500;
    const name = err.name;
    const message = err.message;
    let user = {};
    if (req.user) {
        user._id = req.user._id;
    }
    res.status(status).send({ error: { user, status, name, message } });
};
