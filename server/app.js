const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

const sendEmailService = require('./services/send_email');

app.use(cors());
app.use(morgan('combined'));
app.use(express.static(__dirname + '/../app/www'));

app.post('/sendEmail', sendEmailService);

app.get('/crash', function () {
  process.exit(1);
});

module.exports = app;
