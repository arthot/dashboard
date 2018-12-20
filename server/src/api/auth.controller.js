const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const config = require('../utils/config');

router.post('/signin', async (req, res, next) => {
    try {
        const { login, pass } = req.body;
        const user = config.users.find(u => u.login === login && u.pass === pass);

        if (user) {
            const { id } = user;
            const token = jwt.sign({ id, login }, config.jwt.secret);
            res.cookie('jwt', token, { httpOnly: true, maxAge: 31556952000 });

            res.json({ token });
        } else {
            setTimeout(() => res.status(401).send(), Math.random() * 1000);
        }
    } catch (err) {
        next(err);
    }
});

module.exports = router;
