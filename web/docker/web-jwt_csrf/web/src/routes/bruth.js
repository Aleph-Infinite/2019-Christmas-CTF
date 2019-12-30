const { UserBruth, BoardBruth } = require('../sequelize');

const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

const CONF = require('../config');
const { wrap, getHash } = require('../func');

router.use(express.static(`${__dirname}/../static/bruth`));

router.use((req, res, next) => {
  const token = req.cookies.token_b;
  if (token) {
    jwt.verify(token, CONF.jwt.bruth.key, CONF.jwt.bruth.options, (err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.send({ code: 401, msg: '토큰이 만료되었습니다' });
        } else if (err.name === 'JsonWebTokenError') {
          return res.send({ code: 401, msg: '토큰에 에러가 있습니다' });
        } else {
          return res.send({ code: 401, msg: "토큰 인증 절차에 오류가 발생했습니다", err: err.message });
        }
      } else {
        req.auth = decoded;
        next();
      }
    });
  } else {
    next();
  }
});

router.post('/join', wrap(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) return res.send({ code: 400 });

  const u = await UserBruth.findOne({
    where: { username },
    attributes: ['id'],
  });
  if (u) return res.send({ code: 423 });

  const user = await UserBruth.create({
    username,
    password: getHash(password)
  });

  res.send({ code: 200, id: await user.get('id') });
}));

router.post('/login', wrap(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) return res.send({ code: 400 });

  const user = await UserBruth.findOne({
    where: {
      username,
      password: getHash(password)
    },
    attributes: ['id'],
  });
  if (!user) return res.send({ code: 404 });

  const token = jwt.sign(
    {
      uid: user.id,
      isAdmin: false
    },
    CONF.jwt.bruth.key,
    CONF.jwt.bruth.options
  );
  res.cookie('token_b', token, { httpOnly: true });
  res.send({ code: 200 });
}));

router.get('/logout', (req, res) => {
  res.cookie('token_b', '', { maxAge: Date.now() });
  res.redirect('.');
});

router.get('/me', needAuth, wrap(async (req, res) => {
  const { uid } = req.auth;

  const user = await UserBruth.findOne({ where: { id: uid }, attributes: ['username'] });
  if (!user) return res.send({ code: 500 });

  res.send({ code: 200, username: user.username });
}));

router.get('/flag', wrap(async (req, res) => {
  if (!req.auth) return res.send({ code: 401 });
  if (!req.auth.isAdmin) return res.send({ code: 403 });

  res.send({ code: 200, flag: CONF.flag.bruth });
}));

function needAuth(req, res, next) {
  if (!req.auth) return res.send({ code: 401 });
  next();
}

module.exports = router;