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
  });
}
$.ajax({
  method: 'POST',
  url: '/users/login',
  data: {testy: 'test'},
})
.done(
  res => mysocket(io.connect(), res.token)
)
.fail( (jqXHR, textStatus, errorThrown) => {
  console.log(jqXHR, textStatus, errorThrown)
})