const logger = (req, res, next) => {
    console.log(`[${new Date().toLocaleTimeString() }] ${req.url} ${req.method}`);
    next();
}

const errorHandler = (err, req, res, next) => {
    console.log(err.message);
    next();
}

module.exports = { logger , errorHandler}