const parseBody = require('../utils/parse_body');
const generateGraph = require('./generate_graph');
const renderTemplate = require('./render_template');
const createPDF= require('./create_pdf');
const sendToSendGrid = require('./send_to_send_grid');
const cleanTmpFiles = require('./clean_tmp_files');

function sendEmail(request, response) {
  return parseBody(request)
    .then((message) => generateGraph(message))
    .then((message) => renderTemplate(message))
    .then((message) => createPDF(message))
    .then((message) => sendToSendGrid(message))
    .then((message) => cleanTmpFiles(message))
    .then((message) => response.status(204).send())
    .catch((error) => response.status(400).send({ error: error.message }));
}

module.exports = sendEmail;