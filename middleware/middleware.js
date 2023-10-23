const chalk = require('chalk');

const logger = (req, res, next) => {
    console.log(`[${new Date().toLocaleTimeString() }] `, chalk.red(`${req.url} `), chalk.green(`${req.method}`));
    next();
}

const errorHandler = (err, req, res, next) => {
    console.log(err.message);
    next();
}

module.exports = { logger , errorHandler}