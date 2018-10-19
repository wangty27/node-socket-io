var socket = io(); // initiate request (open socket)

// check if connected to server
socket.on('connect', function () {
    console.log('Connected to server');

});

// check if disconnected from server
socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
    console.log('newMessage', message);
});