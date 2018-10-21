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
    let li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    $('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
    let li = $('<li></li>');
    let anchor = $('<a target="_blank">My Current Location</a>');
    li.text(`${message.from}: `);
    anchor.attr('href', message.url);
    li.append(anchor);

    $('#messages').append(li);
});

$('#message-form').on('submit', function (event) {
    event.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: $('[name=message]').val()
    }, function () {

    });
});

var locationButton = $('#send-location');
locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.');
    }

    navigator.geolocation.getCurrentPosition(function (pos) {
        socket.emit('sendLocationMessage', {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
        });
    }, function (err) {
        alert('Unable to fetch location.');
    });
});