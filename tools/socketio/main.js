const io = require("socket.io")();

const socketapi = { io };

const gEmit = io.sockets.emit
// Add your socket.io logic here!
io.on( "connection", require("socketio-jwt").authorize({
  secret: 'test123',
  // handshake: true,
  timeout: 15000
})).on('authenticated', function( socket={} ) {

  const emit = socket.emit;
  
  (socket.decoded_token && console.log(socket.decoded_token.email, 'has joined')) || console.log('Anonymous has joined') ;
  console.log('decoded =>',socket.decoded_token);

  console.log("socket id =>",socket.id)
  //socket.on('event')


  socket.on('getRoomsList', function() {
    emit( 'rooms', Object.keys(io.sockets.adapter.rooms) );
  });

  // io.sockets.adapter.on("create-room", (room) => {  console.log(`Room ${room} was created`);});
  // io.sockets.adapter.on("delete-room", (room) => {  console.log(`Room ${room} was deleted`);});
  // io.sockets.adapter.on("join-room", (room, id) => {  console.log(`Socket ${id} has joined room ${room}`);});
  // io.sockets.adapter.on("leave-room", (room, id) => {  console.log(`Socket ${id} has leaved room ${room}`);});
  
  socket.on('openRoom', function(roomName) {
    socket.join(roomName)
  });
  
  socket.on('joinRoom', function(roomName) {
    console.log(socket.id," join")
    if(Object.keys(io.sockets.adapter.rooms).includes(roomName)) socket.join(roomName), Gemit('user-msg', `Socket ${id} has joined room ${roomName}`); 
    else emit('user-msg', `La partie nommée "${roomName}" est introuvable`);
  });

  socket.on('closeRoom', function(roomName) {
    io.in(roomName).socketsLeave(roomName);
    socket.on('leaveRoom', function(roomName) {
      socket.leave(roomName)
    });
    console.log(socket.id)
    emit('closeRoom', roomName)
  });
  
  socket.on('leaveRoom', function(roomName) {
    socket.leave(roomName)
  });
  console.log(socket.id)

});
// end of socket.io logic

module.exports = socketapi;