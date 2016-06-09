function parseBody(request) {
  return new Promise((resolve, reject) => {
    var body = '';
    
    request.on('data', (chunk) => body += chunk);
    request.on('end', () => {
      if (request.headers['content-type'] === 'application/json') {
        try {
          return resolve(JSON.parse(body));
        } catch(e) {
          return reject(e);
        }
      }
      
      return resolve(body);
    });
  });
}

module.exports = parseBody;