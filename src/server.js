const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 3500;
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
    console.log("User connected: ", socket.id);
    console.log("User connected: ");

    socket.on('message', (data) => {
        console.log(data);
        io.emit('message', data);
    });

    socket.on('disconnect', () => {
        console.log("User disconnected");
    })
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'view', 'index.html'));
});

server.listen(PORT, () => console.log(`Server running at Port ${PORT}`));