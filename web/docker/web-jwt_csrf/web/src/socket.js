
const socketIO = require('socket.io');

const CONF = require('./config');

const io = socketIO();

function listenIO(httpServer, httpsServer) {
  io.listen(httpServer);
  //if (CONF.https.use) io.attach(httpsServer);
}

io.on('connection', socket => {

});

module.exports = {
  io,
  listenIO,
};
