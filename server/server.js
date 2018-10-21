const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateLocationMessage, generateMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

// listen for new connections
io.on('connection', (socket) => {
    console.log('New user connected');

    // socket.emit from Admin
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

    // socket.broadcast.emit from Admin
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

    socket.on('createMessage', (message, callback) => {
        console.log(message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback();
    });

    socket.on('sendLocationMessage', (coords) => {
        console.log(coords);
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
});



server.listen(port, () => {
    console.log('Listening on PORT 3000');    
});