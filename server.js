const express = require('express');

const app = express();
const http = require('http'); // importing http
const server = http.createServer(app); // this is combination of express + HTTP
const { Server } = require('socket.io');

const io = new Server(server); // This is how you are actually creating io instance
const PORT = 8880;

io.on('connection', (socket) => {
    console.log(socket.id);
    socket.on('data', (data) => {
        io.emit('data', data);
    });
});

// arr.use is used to run middleweres 
app.use(express.static('Public'));

// HTTP + express should listen
server.listen(PORT); //Combine server port with myport