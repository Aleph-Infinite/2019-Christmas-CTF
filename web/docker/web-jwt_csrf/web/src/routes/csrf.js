const { UserCsrf, BoardCsrf } = require('../sequelize');

const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

const { io } = require('../socket');

const CONF = require('../config');
const { wrap, getHash } = require('../func');
const request = require('request-promise');

router.use(express.static(`${__dirname}/../static/csrf`));

router.get('/logout', (req, res) => {
  res.cookie('token', '', { maxAge: Date.now() });
  res.redirect('.');
});

router.use((req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    jwt.verify(token, CONF.jwt.csrf.key.public, CONF.jwt.csrf.options, (err, decoded) => {
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

  const u = await UserCsrf.findOne({
    where: { username },
    attributes: ['id'],
  });
  if (u) return res.send({ code: 423 });

  const user = await UserCsrf.create({
    username,
    password: getHash(password)
  });

  res.send({ code: 200, id: await user.get('id') });
}));

router.post('/login', wrap(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) return res.send({ code: 400 });

  const user = await UserCsrf.findOne({
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
    CONF.jwt.csrf.key.private,
    CONF.jwt.csrf.options
  );
  res.cookie('token', token, { httpOnly: true });
  res.send({ code: 200 });
}));

router.post('/admin', (req, res) => {
  if (req.body.password !== CONF.password) return res.send({ code: 404 });

  const options = CONF.jwt.csrf.options;
  options.expiresIn = '3d';

  const token = jwt.sign(
    {
      uid: 0,
      isAdmin: true,
    },
    CONF.jwt.csrf.key.private,
    options,
  );
  res.cookie('token', token, { httpOnly: true });
  res.send({ code: 200, token });
});

router.get('/me', needAuth, wrap(async (req, res) => {
  const { uid } = req.auth;

  const user = await UserCsrf.findOne({ where: { id: uid }, attributes: ['username'] });
  if (!user) return res.send({ code: 500 });

  res.send({ code: 200, username: user.username });
}));

router.get('/board', needAuth, wrap(async (req, res) => {
  const { uid } = req.auth;

  const boards = await BoardCsrf.findAll({
    where: { uid },
    attributes: ['id', 'title'],
    limit: 10,
    order: [['id', 'DESC']],
  });

  res.send({ code: 200, data: boards });
}));

router.get('/board/:id', needAuth, wrap(async (req, res) => {
  const { id } = req.params;
  const { uid, isAdmin } = req.auth;

  const board = await BoardCsrf.findOne({
    where: {
      id,
    },
    attributes: ['uid', 'title', 'content'],
  });

  if (!board) return res.send({ code: 404 });
  if (board.uid !== uid && !isAdmin) return res.send({ code: 404 });

  if (board.content.match(/script|img|on/i)) return res.send({ code: 400 });

  res.send(`<html><h1>${board.title}</h1><span>${board.content}</span></html>`);
}));

router.post('/board', needAuth, wrap(async (req, res) => {
  const { uid } = req.auth;
  const { title, content } = req.body;

  if (!title || !content) return res.send({ code: 400 });

  const board = await BoardCsrf.create({
    uid,
    title,
    content,
  });

  const id = await board.get('id');
  res.send({ code: 200, id });

  io.emit('new', id);
}));

router.get('/count', needAuth, wrap(async (req, res) => {
  const { uid, isAdmin } = req.auth;
  if (isAdmin) {
    const boards = await BoardCsrf.findAll({
      attributes: ['id']
    });
    res.send({ code: 200, count: boards.length })
  } else {
    res.send({ code: 404 });
  }

}));

function needAuth(req, res, next) {
  if (!req.auth) return res.send({ code: 401 });
  next();
}

module.exports = router;
