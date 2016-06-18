const express = require('express');
const morgan = require('morgan');
const app = express();

app.disable('x-powered-by');
app.use(morgan('combined'));
app.use(express.static(__dirname + '/../app/www'));

module.exports = app;
