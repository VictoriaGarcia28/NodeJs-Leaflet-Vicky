module.exports = io => {
  io.on('connection', socket => {

    console.log('new user connected');

    socket.on('userCoordinates', (coords) => {
      console.log(coords);
      socket.broadcast.emit('newUserCoordinates', coords);
    });
  });
};
