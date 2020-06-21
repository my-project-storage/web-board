const morgan = require('morgan');
const express = require('express');
const logger = require('./utils/logger');

module.exports = function expressLoader(app) {
    try {
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use(morgan('dev'));
        logger.info('Complete Loaded');
    } catch (expressLoaderError) {
        logger.error(expressLoaderError.message);
        throw new Error(expressLoaderError);
    }
};
