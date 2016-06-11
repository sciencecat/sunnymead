const fs = require('fs');

function cleanTmpFiles(message) {
  return new Promise((resolve, reject) => {
    fs.unlink(message.pdfFilename, (err) => {
      if (err) {
        return reject(err);
      }
      
      delete message.pdfFilename;
      
      return resolve(message);
    })
  });
}

module.exports = cleanTmpFiles;