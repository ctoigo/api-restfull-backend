import fs from 'fs';
import http from 'http';
import https from 'https';

import app from './app';

const privateKey = fs.readFileSync(
  '/etc/letsencrypt/live/backend.apirestfull.com.br/privkey.pem',
  'utf8'
);
const certificate = fs.readFileSync(
  '/etc/letsencrypt/live/backend.apirestfull.com.br/cert.pem',
  'utf8'
);
const ca = fs.readFileSync(
  '/etc/letsencrypt/live/backend.apirestfull.com.br/chain.pem',
  'utf8'
);

const credentials = {
  key: privateKey,
  cert: certificate,
  ca,
};

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(80);
httpsServer.listen(443);
