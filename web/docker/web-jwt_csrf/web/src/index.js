const CONF = require('./config');

const http = require('http');
const https = require('https');

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const app = express();

const bruthapp = require('./routes/bruth');
const csrfapp = require('./routes/csrf');

const { listenIO } = require('./socket');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan('common'));
app.use(helmet());
app.use(cors());

app.use('/bruth', bruthapp);
app.use('/csrf', csrfapp);

app.use((err, _req, res, _next) => {
  console.log(err);
  res.send({ code: 500 });
});

app.use((_req, res, _next) => {
  res.send({ code: 404 });
});

const sslSetting = CONF.https.use ? {
  key: fs.readFileSync(CONF.https.key),
  cert: fs.readFileSync(CONF.https.cert),
} : {};

const httpServer = http.createServer(app);
const httpsServer = https.createServer(sslSetting, app);

(async () => {
  httpServer.listen(CONF.http.port, () => {
    console.log('HTTP Server Start');
  });

  if (CONF.https.use) {
    httpsServer.listen(CONF.https.port, () => {
      console.log('HTTPS Server Start');
    });
  }

  listenIO(httpServer, httpsServer);
})();
