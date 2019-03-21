// chat.js is where we will run all our custom socket code
// chat.js stores code for making connection between client & server

// Make connection (we can access to 'io' variable since websocket.io cdn library is loaded within index.html)
const socket = io.connect(); // client-side socket

// DOM query

const chatWindow = document.getElementById('chat-window');
const user = document.getElementById('user');
const message = document.getElementById('message');
const sendButton = document.getElementById('send');
const feedback = document.getElementById('feedback');

// socket.emit(dataName, dataObject); dataObject can be a string or POJO w/ key-values
// socket.on(dataName, callback(dataObject);
// socket.broadcast.emit

sendButton.addEventListener('click', () => {
    socket.emit('chat', {
        user: user.value,
        message: message.value
    })
});

message.addEventListener("keypress", () => {
  socket.emit("typing", { user: user.value });
});

socket.on('chat', (data) => {
    feedback.innerHTML = ''; // resets to empty string upon receiving message
    message.value = '';
    chatWindow.innerHTML += '<p><strong>' + data.user + ':</strong> ' + data.message + '</p>'
});

socket.on('typing', (data) => {
    feedback.innerHTML = '<p><em>' + data.user + ' is typing a message...' + '</em></p>'
});