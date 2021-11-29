module.exports = io => {
  const User = new Map()
  // Add your socket.io logic here!
  io.on( "connection", require("socketio-jwt").authorize({
    secret: 'test123',
    // handshake: true,
    timeout: 15000
  })).on('authenticated', function( socket={} ) {
    const socketItems = {io,socket}

    if(socket.decoded_token){
      console.log(socket.decoded_token.email, 'has joined'),
      console.log('decoded =>',socket.decoded_token)
      User.set(socket.decoded_token.nom, { socket: socket.id })
      console.log(User)
    } else console.log('Anonymous has joined');

    console.log("socket id =>",socket.id)
    //socket.on('event')
    const Rooms = require("./room.js")(socketItems, {
      open: "openRoom",
      join: "joinRoom",
      leave: "leaveRoom",
      close: "closeRoom",
      list: "getRoomsList",
    })

  });
  // end of socket.io logic

  return io
};