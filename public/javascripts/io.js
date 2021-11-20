const socket = io()  
var global_status = "waiting"

join = () => {
  global_status = "searching"
  searching()
}

searching = () => {
  if (global_status == "searching") {

    setTimeout(function(){
      socket.emit('searching');
      searching()
    }, 3000)
  }
}

socket.on('search', (data) => {
  
})