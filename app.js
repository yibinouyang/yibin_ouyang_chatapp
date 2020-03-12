var express = require('express');
var app = express();
var io = require('socket.io')();
var rndColor = require('randomcolor');  // randomcolor package for generating random colors


const port = process.env.PORT || 3030;

// tell express where our static files are (js, images, css etc)
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

const server = app.listen(port, () => {
    console.log(`app is running on port ${port}`);
});

// global object to hold all mappings: (socket.id => color-in-rgba-format)
const colorMap = {};

io.attach(server);

io.on('connection', function(socket) {
    console.log('a user has connected');

    // create a random color for the new connected socket.id
    colorMap[socket.id] = rndColor({
        luminosity: 'dark',
        format: 'rgba',
        alpha: 0.75
    });

    socket.emit('connected', {
        sID: `${socket.id}`,
        message: `new connection: ${socket.id}`
    });

    // on new connection, emit a new notification to everyone connected to the app
    // socket.id and the corresponding color are included
    io.emit('notification', {
        id: `${socket.id}`,
        color: colorMap[socket.id],
        event: 'newConn'
    });

    // listen for an incoming message from anyone connected to the app
    socket.on('chat message', function(msg) {
        console.log('message: ', msg, 'socket:', socket.id);

        // send the message to everyone connected to the app
        io.emit('chat message', {
            id: `${socket.id}`,
            color: colorMap[socket.id],
            message: msg
        });
    });

    // on disconnection, emit a new notification to everyone connected to the app
    // socket.id and the corresponding color are included
    socket.on('disconnect', function() {
        console.log('a user has disconnected');

        io.emit('notification', {
            id: `${socket.id}`,
            color: colorMap[socket.id],
            event: 'disconn'
        });

        // remove the previously-created random color for the disconnected socket.id
        delete colorMap[socket.id];
    });
});