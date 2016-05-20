const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(morgan('combined'));
app.use(express.static(__dirname + '/../app/www'));

app.get('/crash', function () {
  process.exit(1);
});

module.exports = app;
