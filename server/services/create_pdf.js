const wkhtmltopdf = require('wkhtmltopdf');
const ejs = require('ejs');
const fs = require('fs');

wkhtmltopdf.command = `${__dirname}/../bin/wkhtmltopdf`;

function createPDF(message) {
  return new Promise((resolve, reject) => {
    fs.readFile(`${__dirname}/../templates/pdf_template.html`, 'utf-8', (err, templateString) => {
      if (err) {
        return reject(err);
      }
      
      const filename = `${__dirname}/tmp_pdf/${Date.now()}.pdf`;
      
      wkhtmltopdf(ejs.render(templateString, message), { output: filename }, function (err) {
        if (err) {
          return reject(err);
        }
        
        message.pdfFilename = filename;
          
        return resolve(message);
      });
    });
  });
}

module.exports = createPDF;