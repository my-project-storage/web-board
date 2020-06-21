const expressLoader = require('./express');
const expressRouter = require('./api/routes');
const app = require('express')();
const logger = require('./utils/logger');

function server(app) {
    expressLoader(app);
    expressRouter(app);
    app.listen(3333, () => {
        logger.info(`Started http://localhost:9000/`);
    });
}

server(app);