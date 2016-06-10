const ejs = require('ejs');
const fs = require('fs');

function renderTemplate(message) {
  return new Promise((resolve, reject) => {
    fs.readFile(`${__dirname}/../templates/email_template.html`, 'utf-8', (err, templateString) => {
      if (err) {
        return reject(err);
      }
      
      message.html = ejs.render(templateString, message);
      
      return resolve(message);
    });
  });
}

module.exports = renderTemplate;