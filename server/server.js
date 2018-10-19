const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

// listen for new connections
io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage', {
        from: 'Mike',
        To: 'Jen',
        text: 'Yahoo!',
        createdAt: new Date().getTime()
    });

    socket.on('createMessage', (message) => {
        console.log(message);
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
});



server.listen(port, () => {
    console.log('Listening on PORT 3000');    
});