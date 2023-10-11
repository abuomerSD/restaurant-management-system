const logger = (req, res, next) => {
    console.log(`[${new Date().toLocaleTimeString() }] ${req.url} ${req.method}`);
    next();
}

module.exports = { logger }