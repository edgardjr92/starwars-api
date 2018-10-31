const logger = require('../utils/logger');
const mongoose = require('mongoose');
const config = require('config');

module.exports = function() {
    const db = config.get('db');
    mongoose.connect(db, { useNewUrlParser: true })
        .then(() => logger.log('info', `Connected to ${db}...`))
        .catch((err) => logger.log('error', 'Coulkd not connect to MongoDB...'));
}