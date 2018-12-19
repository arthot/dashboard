const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const router = require('./routes');
const { errorLogger } = require('./utils/bunyan');

app.use(express.json());
app.use(cookieParser());
app.use('/api', router);
app.use(errorLogger);

module.exports = app;
