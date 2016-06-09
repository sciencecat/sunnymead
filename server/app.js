const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

const sendEmailService = require('./services/send_email');

app.disable('x-powered-by');
app.use(cors());
app.use(morgan('combined'));
app.use(express.static(__dirname + '/../app/www'));

app.post('/sendEmail', sendEmailService);

module.exports = app;
