require('express-async-errors');
const logger = require('./utils/logger');
const express = require('express');
const app = express();

require('./startup/routes')(app);
require('./startup/db')();

const port = process.env.PORT || 3000;
const server = app.listen(port, () => logger.log('info', `Listening on port ${port}...`)); 

module.exports = server;