const bunyan = require('bunyan');
const bunyanDebugStream = require('bunyan-debug-stream');
const expressLogger = require('express-bunyan-logger');
const config = require('./config');

function getStreams() {
    const streams = [{
        level: config.log.level,
        type: 'raw',
        stream: bunyanDebugStream({
            showPid: false,
            forceColor: true,
        })
    }];

    return streams;
}

const logger = bunyan.createLogger({
    name: 'server',
    streams: getStreams(),
    serializers: bunyanDebugStream.serializers,
});

const errorLogger = expressLogger.errorLogger({ logger });

module.exports.logger = logger;
module.exports.getStreams = getStreams;
module.exports.errorLogger = errorLogger;
