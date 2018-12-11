const app = require('./app');
const config = require('./utils/config');
const log = require('./utils/log')(module);

const server = app.listen(config.node.port, config.node.host, function () {
    log.info(`Listening on http://${config.node.host || '0.0.0.0'}:${config.node.port} in ${process.env.NODE_ENV} mode`);
});

process.on('uncaughtException', function (err) {
    log.error(err);
});

process.on('unhandledRejection', function (err) {
    log.error(err);
});

module.exports = server;
