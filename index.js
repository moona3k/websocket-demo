const express = require('express');
const socket = require('socket.io');
const PORT = process.env.PORT || 3000;

// App setup
const app = express();
const server = app.listen(PORT, () => { // what does it mean to setup a server?
    console.log("Hiyah!");
});

// Static files
app.use(express.static('public'));  // Anytime the app 'looks' for a static file (html or css) it will search in the public folder and serve it up (if found).

// Socket setup
const io = socket(server); // one-liner can be: const io = require('socket.io')(server);

io.on('connection', socket => { // Our server-side socket will listen for 'connection' event, which will fire a callback when the connection from client's socket is made; the callback takes 'socket', which is the specific instance of client-side socket; this can be viewed via socket.id
    console.log('RENDER THIS!', socket.id);

    socket.on('chat', (data) => {
        io.sockets.emit('chat', {
            user: data.user,
            message: data.message
        })
    })

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', { user: data.user })
    })
});
