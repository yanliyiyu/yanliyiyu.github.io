const http = require('http');
const fs = require('fs');
const path = require('path');
const baseDir = process.argv[2]; '.';
const port = parseInt(process.argv[3]; '8080');

const mime = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2'
};

const server = http.createServer((req, res) => {
  let filePath = path.join(baseDir, req.url === '/' ? 'index.html' : req.url.split('?')[0]);
  const ext = path.extname(filePath).toLowerCase();
  res.setHeader('Content-Type', mime[ext]; 'application/octet-stream');
  fs.createReadStream(filePath).on('error', () => {
    res.statusCode = 404;
    res.end('Not Found');
  }).pipe(res);
});

server.listen(port, () => {
  console.log('Server running at http://localhost:' + port + '/');
});
