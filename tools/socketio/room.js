module.exports = ({io, socket}, events) => {

  const roomEvent = {

    open(Rooms, event) {
      socket.on(event, function(roomName) {
        if(Rooms.get(roomName) === undefined ) {
  
          const room = {
            id: socket.id+':'+(new Date().valueOf()),
            state: {name: roomName}
          }
  
          Rooms.set(roomName, room)
          joinRoom(room)
          io.sockets.emit("newRoom", room.state.name)
        } else socket.emit('user-msg', `La partie nommée "${roomName}" est déja ouverte`);
  
      });
    },
  
    join(Rooms, event) {
      socket.on(event, function(roomName) {
        const room = Rooms.get(roomName) && joinRoom(room.id) || socket.emit('user-msg', `La partie nommée "${roomName}" est introuvable`);
      });
    },
  
    leave(Rooms, event) {
      socket.on(event, function(roomName) { leaveRoom(Rooms.get(roomName)) });
    },
  
    close(Rooms, event) {
      socket.on(event, function(roomName) {
        const room = Rooms.get(roomName)
        socket.emit(event, `La partie nommée "${roomName}" à été fermée`)
        Object.values(io.in(room.id).sockets).forEach(s => s.leave(room.id))
      });
    },
  
    list(Rooms, event){
      socket.on(event, () => socket.emit( 'rooms', [...Rooms.keys()] ) );
    }
  
  }

  function joinRoom(room){
    socket.join(room.id)
    socket.emit("roomState", room.state)
    socket.to(room.id).emit('user-msg', `Socket ${socket.id} has joined room ${room.id}`)
  }

  function leaveRoom(room){
    socket.leave(room.id)
    socket.to(room.id).emit('user-msg', `Socket ${socket.id} has leave room ${room.id}`)
  }

  function getRoomEvent(Rooms, [methodName, event]) {
    roomEvent[methodName] instanceof Function && roomEvent[methodName](Rooms, event)
    return Rooms
  }

  return Object.entries(events).reduce(getRoomEvent,new Map())
}