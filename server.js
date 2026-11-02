const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp'
};

const ALLOWED_SAVE_FILES = [
  'gallery_config.json',
  'gallery.json',
  'schedule.json',
  'thoughts.json',
  'feedback.json',
  'numerology.json'
];

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Access-Control-Allow-Origin': '*'
  });
  res.end(JSON.stringify(data));
}

const server = http.createServer((req, res) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    return res.end();
  }

  // Handle API saving endpoints
  if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 5 * 1024 * 1024) { // 5MB limit
        req.destroy();
      }
    });

    req.on('end', () => {
      try {
        const payload = JSON.parse(body || '{}');

        if (req.url === '/api/save-gallery-config') {
          const filePath = path.join(__dirname, 'gallery_config.json');
          fs.writeFileSync(filePath, JSON.stringify(payload, null, 2), 'utf8');
          return sendJson(res, 200, { success: true, message: 'Gallery configuration saved successfully' });
        }

        if (req.url === '/api/save-json') {
          const { filename, data } = payload;
          if (!ALLOWED_SAVE_FILES.includes(filename)) {
            return sendJson(res, 400, { success: false, error: 'Unauthorized file target' });
          }
          const filePath = path.join(__dirname, filename);
          fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
          return sendJson(res, 200, { success: true, message: `${filename} updated successfully` });
        }

        return sendJson(res, 404, { success: false, error: 'API endpoint not found' });
      } catch (err) {
        return sendJson(res, 500, { success: false, error: err.message });
      }
    });
    return;
  }

  // Handle Static File Serving
  let reqPath = decodeURI(req.url.split('?')[0]);
  if (reqPath === '/' || reqPath === '') reqPath = '/index.html';
  if (reqPath === '/admin') reqPath = '/admin.html';

  const filePath = path.join(__dirname, reqPath);

  // Security check: ensure path stays within workspace root
  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    return res.end('403 Forbidden');
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 Server Error: ' + err.code);
      }
    } else {
      res.writeHead(200, { 
        'Content-Type': contentType,
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      });
      res.end(content);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
  console.log(`Admin Panel available at http://localhost:${PORT}/admin.html`);
});
