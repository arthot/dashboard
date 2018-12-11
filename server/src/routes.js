const nocache = require('nocache');
const router = require('express').Router();

const auth = require('./api/auth.controller');

router.use('/auth/', nocache(), auth);

function isAuthenticated(req, res, next) {
    if (req.user)
        return next();

    return res.status(401).send();
}

module.exports = router;
