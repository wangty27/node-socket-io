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

    let messageTextbox = $('[name=message]');

    socket.emit('createMessage', {
        from: 'User',
        text: messageTextbox.val()
    }, function () {
        messageTextbox.val('');
    });
});

var locationButton = $('#send-location');
locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.');
    }

    locationButton.attr('disabled', 'disabled').text('Sending Location...');

    navigator.geolocation.getCurrentPosition(function (pos) {
        locationButton.removeAttr('disabled').text('Send Location');
        socket.emit('sendLocationMessage', {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
        });
    }, function (err) {
        locationButton.removeAttr('disabled').text('Send Location');
        alert('Unable to fetch location.');
    });
});