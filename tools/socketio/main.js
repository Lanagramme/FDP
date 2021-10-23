const io = require("socket.io")();
const socketioJwt = require("socketio-Jwt");

const socketapi = {
  io
};

// Add your socket.io logic here!
io.on( "connection", socketioJwt.authorize({
  secret: 'test123',
  // handshake: true,
  timeout: 15000
})).on('authenticated', function( socket={} ) {

  console.log(socket.decoded_token.email, 'has joined');
  // console.log(socket.decoded_token);
  //socket.on('event')
});
// end of socket.io logic

module.exports = socketapi;