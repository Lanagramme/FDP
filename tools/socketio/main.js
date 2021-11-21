const io = require("socket.io")();
// const socketioJwt = require("socketio-Jwt");

const socketapi = {
  io
};

// Add your socket.io logic here!
io.on( "connection", /**socketioJwt.authorize({
  secret: 'test123',
  // handshake: true,
  timeout: 15000
})).on('authenticated', */ function( socket={} ) {

  (socket.decoded_token && console.log(socket.decoded_token.email, 'has joined')) || console.log('Anonymous has joined') ;
  // console.log(socket.decoded_token);
  socket.on('leaveRoom', function(roomName) {
    socket.leave(roomName)
    socket.on('leaveRoom', function(roomName) {
      socket.on('leaveRoom', function(roomName) {
        socket.leave(roomName)
      });
      console.log(socket.id)
      socket.leave(roomName)
    });
    console.log(socket.id)
  });
  console.log(socket.id)
  //socket.on('event')


  socket.on('getRoomsList', function() {
    socket.emit( 'rooms', Object.keys(io.socket.adapter.rooms) );
  });

  io.sockets.adapter.on("create-room", (room) => {  console.log(`Room ${room} was created`);});
  io.sockets.adapter.on("delete-room", (room) => {  console.log(`Room ${room} was deleted`);});
  io.sockets.adapter.on("join-room", (room, id) => {  console.log(`Socket ${id} has joined room ${room}`);});
  io.sockets.adapter.on("leave-room", (room, id) => {  console.log(`Socket ${id} has leaved room ${room}`);});
  
  socket.on('openRoom', function(roomName) {
    socket.join(roomName)
  });
  
  socket.on('joinRoom', function(roomName) {
    console.log(socket.id)
    if(Object.keys(io.sockets.adapter.rooms).includes(roomName)) socket.join(roomName); 
    else socket.emit('user-msg', `La partie nommée "${roomName}" est introuvable`);
  });

  socket.on('closeRoom', function(roomName) {
    io.in(roomName).socketsLeave(roomName);
    socket.on('leaveRoom', function(roomName) {
      socket.leave(roomName)
    });
    console.log(socket.id)
    socket.emit('closeRoom', roomName)
  });
  
  socket.on('leaveRoom', function(roomName) {
    socket.leave(roomName)
  });
  console.log(socket.id)

});
// end of socket.io logic

module.exports = socketapi;