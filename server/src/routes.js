const nocache = require('nocache');
const router = require('express').Router();
const jwt = require('express-jwt');
const config = require('./utils/config');

const auth = require('./api/auth.controller');
const conf = require('./api/config.controller');

const jwtAuth = jwt({
    secret: config.jwt.secret,
    getToken: req => req.cookies && req.cookies['jwt'],
    credentialsRequired: false,
});

router.use('/auth/', nocache(), auth);
router.use('/config/', nocache(), jwtAuth, isAuthenticated, conf);

function isAuthenticated(req, res, next) {
    if (req.user)
        return next();
    else
        return res.status(403).send();
}

module.exports = router;
