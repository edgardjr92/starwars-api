const logger = require('../utils/logger');
const mongoose = require('mongoose');

module.exports = function() {
    mongoose.connect('mongodb://192.168.99.100/starwars', { useNewUrlParser: true })
        .then(() => logger.log('info', 'Connected with MongoDB...'))
        .catch((err) => logger.log('error', 'Coulkd not connect to MongoDB...'));
}