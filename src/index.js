const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const engine = require('ejs-mate');

const app = express();
const server = http.Server(app);
const io = socketIO(server);

// settings
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');


// routes
app.use(require('./routes'));

// sockets
require('./sockets')(io);

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// inicializando el servidor en el puerto 4000 (localhost:4000)
server.listen(4000, () => {
  console.log('Server on port', 4000);
});
