const parseBody = require('../utils/parse_body');
const generateGraph = require('./generate_graph');
const renderTemplate = require('./render_template');
const sendToSendGrid = require('./send_to_send_grid');

function sendEmail(request, response) {
  return parseBody(request)
    .then((message) => generateGraph(message))
    .then((message) => renderTemplate(message))
    .then((message) => sendToSendGrid(message))
    .then((message) => response.status(200).send(message.html))
    .catch((error) => response.status(400).send({ error: error.message }));
}

module.exports = sendEmail;