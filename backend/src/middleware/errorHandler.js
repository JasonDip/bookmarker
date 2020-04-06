/*  sends error messages  */
module.exports = (err, req, res, next) => {
    const status = err.statusCode || 500;
    const name = err.name;
    const message = err.message;
    res.status(status).send({
        error: { status, name, message }
    });
};
