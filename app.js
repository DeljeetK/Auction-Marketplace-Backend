require('dotenv').config();
const express = require('express');
const connectDB = require('./db/db');
const app = express();
const config = require('./config/config');
const socket = require('./socket');
const cors = require('cors');
const PORT = config.port.PORT;
const path = require('path');
var cookieParser = require('cookie-parser');

// Attach socket to the server
const server = app.listen(PORT);
app.use(cors());
// Error handling
server.on('error', onError);
server.on('listening', onListening);

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof PORT === 'string'
    ? 'Pipe ' + PORT
    : 'Port ' + PORT;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('Listening on ' + bind);
}

// Connect to MongoDB
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// Middleware

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("public/productImages"));
app.use(express.static("public/profileImages"));




app.use(express.json());
app.use('/', require('./routes/index'));
