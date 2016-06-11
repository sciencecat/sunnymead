function parseBody(request) {
  return new Promise((resolve, reject) => {
    var body = '';
    
    request.on('data', (chunk) => body += chunk);
    request.on('end', () => {
      try {
        return resolve(JSON.parse(body));
      } catch(e) {
        return resolve(body);
      }
    });
  });
}

module.exports = parseBody;