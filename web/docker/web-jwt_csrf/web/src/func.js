const crypto = require('crypto');

const CONF = require('./config');

function wrap(asyncFn) {
  return (async (req, res, next) => {
    try {
      return await asyncFn(req, res, next);
    } catch (error) {
      return next(error);
    }
  });
}

function getHash(str) {
  return crypto.createHmac('md5', CONF.hashSort).update(str).digest("base64");
}

module.exports = {
  wrap,
  getHash,
}
