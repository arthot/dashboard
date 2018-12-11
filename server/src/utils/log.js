const { logger } = require('./bunyan');

function getLogger(module) {
    const path = module.filename.split(/[/\\]/).slice(-2).join('/').replace('.js', '');

    return logger.child({ path });
}

module.exports = getLogger;
