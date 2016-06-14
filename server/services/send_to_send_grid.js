const sendgrid  = require('sendgrid')(process.env.SENDGRID_API_KEY);

function sendToSendGrid(message) {
  return new Promise((resolve, reject) => {
    const email = new sendgrid.Email({
      to: message.destinations.map((destination) => destination.email),
      from: message.user.email,
      subject: `${message.user.name} - Resultado da avaliação do Eneagrama`,
      html: message.html,
      files: [
        {
          filename: 'image.png',
          content: message.graphData,
          cid: 'cqaqtqwqiqlqldqoqmqiqnqaqtqeqtqhqeqwqoqrqlqd'
        },
        {
          filename: 'resultado.pdf',
          path: message.pdfFilename
        }
      ]
    });
    
    sendgrid.send(email, (err, res) => {
      if (err) {
        return reject(err);
      }
      
      if (res.message !== 'success') {
        return reject(res);
      }
      
        
      return resolve(message);
    })
  });
}

module.exports = sendToSendGrid;