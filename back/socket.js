// socket.js
const socketIo = require('socket.io');

let io;

function initSocket(server) {
  io = socketIo(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    },
  });

  io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });

    socket.on('updateTask', (task) => {
      io.emit('updateTask', task);
    });

    socket.on('taskAdded', (task) => {
      io.emit('taskAdded', task);
    });
    socket.on('awardAdded', (award) => {
      io.emit('awardAdded', award);
    });
  });
}

function getIo() {
  if (!io) {
    throw new Error('Socket.io not initialized!');
  }
  return io;
}

module.exports = { initSocket, getIo };
