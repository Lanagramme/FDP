const room_function = {}
function mysocket(socket, token="") {
  socket.on('connect', () => {
    socket
      .emit('authenticate', { token }) //send the jwt
      .on('authenticated', () => {
        //do other things
      })
      .on('unauthorized', (msg) => {
        console.log(`unauthorized: ${JSON.stringify(msg.data)}`);
        throw new Error(msg.data.type);
      })

    room_function.join = (roomName) => socket.emit('joinRoom', roomName)
    room_function.leave = (roomName) => socket.emit('leaveRoom', roomName)
    room_function.open = (roomName) => socket.emit('openRoom', roomName)
    room_function.close = (roomName) => socket.emit('closeRoom', roomName)
    socket.on( 'user-msg', msg => alert(msg) )
  });
}
$.ajax({
  method: 'POST',
  url: '/users/login',
  data: {email: 'test'},
})
.done(
  res => (mysocket(io.connect(), res.token))
)
.fail( (jqXHR, textStatus, errorThrown) => {
  console.log(jqXHR, textStatus, errorThrown)
})