const express = require('express');
const app = express();
const router = require('./routes');
const { errorLogger } = require('./utils/bunyan');

app.use(express.json());
app.use('/api', router);
app.use(errorLogger);

module.exports = app;
