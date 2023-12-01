const http = require('http');
const fs = require('fs');
const path = require('path');

http.createServer((req, res) => {
  const reqFilePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : 
    path.extname(req.url) !== '' ? req.url : `${req.url}.html`);

  console.log(reqFilePath);
  fs.readFile(reqFilePath, (err, data) => {
    if (err) {
      if(err.code === 'ENOENT') {
        fs.readFile(path.join(__dirname, 'public', '404.html'), (err, data) => {
          res.writeHead(200, {'Content-Type' : 'text/html'});
          res.end(data);
        })
      } 
      else {
        res.writeHead(500);
        res.end('Server Error');
      }
      console.log(err);
    }
    else {
      let contentType = 'text/html';
      switch(path.extname(reqFilePath)) {
        case '.css':
          contentType = 'text/css';
          break;
        case '.ico':
          contentType = 'image/x-icon';
          break;
      }

      res.writeHead(200, {'Content-Type': contentType});
      res.end(data);
    }
  })
}).listen(8080, () => console.log('Server running'));