const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const planetsRouter = require('../routes/planets');
const error = require('../middleware/error');

module.exports = function(app) {
    app.use(express.urlencoded({ extended: true }));
    app.use(helmet());
    app.use(morgan('tiny'));
    app.use(express.json());
    app.use('/api/planets', planetsRouter);
    app.use(error);
}