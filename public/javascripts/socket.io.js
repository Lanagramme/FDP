const room_function = {}

function socketAuth(socket, token="") {
  socket.on('connect', () => {
    socket
      .emit('authenticate', { token }) //send the jwt
      .on('authenticated', () => socketMain(socket))
      .on('unauthorized', socketError)
    
  });
}

function socketMain (socket){

  socket.on( 'user-msg', msg => alert(msg) )
  socket.on( 'rooms', rooms => console.log(rooms) )
  socket.on( 'roomState', state => console.log(state) )

  room_function.join = (roomName) => socket.emit('joinRoom', roomName);
  room_function.leave = (roomName) => socket.emit('leaveRoom', roomName);
  room_function.open = (roomName) => socket.emit('openRoom', roomName);
  room_function.close = (roomName) => socket.emit('closeRoom', roomName);
  room_function.list = () => socket.emit('getRoomsList');

}

function socketError(msg){
  console.log(`unauthorized: ${JSON.stringify(msg.data)}`);
  throw new Error(msg.data.type);
}

function socketConnect(data){
  $.ajax({
    method: 'POST',
    url: '/users/login',
    data,
  })
  .done( res => socketAuth(io.connect(), res.token) )
  .fail( (jqXHR, textStatus, errorThrown) => {
    console.log(jqXHR, textStatus, errorThrown)
  })
}
