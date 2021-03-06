
const winston = require('winston');

const logger = winston.createLogger({
    format: winston.format.simple(),
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: 'out.log' })
    ]
  });

module.exports = logger;