const authRouter = require('./auth');
const logger = require('../../utils/logger');
module.exports = function expressRouter(app) {
    app.use('/auth', authRouter);
    logger.info('Complete Routes');
};
