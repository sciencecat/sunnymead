const parseBody = require('../utils/parse_body');

function sendEmail(request, response) {
  parseBody(request)
    .then((body) => { 
      console.log(JSON.stringify(body));
      return;
    })
    .then(() => { response.status(204).send(); })
    .catch((error) => { response.status(400).send({ error: error.message }); });
}

module.exports = sendEmail;