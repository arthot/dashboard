const path = require('path');
const nconf = require('nconf');

const CONFIG_DIR = '../../config';
const PREFIX = 'DASHBOARD__';
const regExp = new RegExp('^' + PREFIX);

const env = process.env.NODE_ENV || 'development';
const defaultConfig = path.join(__dirname, CONFIG_DIR, 'config.json');
const envConfig = path.join(__dirname, CONFIG_DIR, `config.${env.trim()}.json`);

nconf
    .env({
        separator: '__',
        whitelist: regExp,
        transform: o => {
            if (!regExp.test(o.key)) return o;
            o.key = o.key.replace(PREFIX, '');
            if (o.value && (o.value.startsWith('[') || o.value.startsWith('{')))
                o.value = JSON.parse(o.value);
            return o;
        }
    })
    .argv()
    .file({
        type: 'override',
        file: envConfig,
        search: true,
    })
    .file('default', defaultConfig);

module.exports = {
    node: {
        host: nconf.get('node:host'),
        port: nconf.get('node:port'),
    },
    log: {
        level: nconf.get('log:level'),
    },
    jwt: {
        secret: nconf.get('jwt:secret'),
    },
}
