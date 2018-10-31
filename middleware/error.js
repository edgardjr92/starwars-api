const logger = require('../utils/logger');

function error(err, req, res, next) {
    logger.log('error', err.stack);
    res.status(500).send('Something failed.');
}

module.exports = error;