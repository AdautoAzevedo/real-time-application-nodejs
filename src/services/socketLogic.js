const socketIo = require('socket.io');
const messageController = require('../controller/messageController');

let io;
const connectedUser = new Map();
    

const initializeSocket = (server) => {  
    io = socketIo(server);
    io.on('connection', (socket) => {
        console.log("User connected: ", socket.id);
    
        socket.on('login', (username) => {
            connectedUser.set(socket.id, username);
            io.emit('message', {
                username: 'Server', 
                message: `${username} joined the chat`
            })
        })
    
        socket.on('message', (message) => {
            messageController.sendMessage(io, message);
        });
    
        socket.on('disconnect', () => {
            console.log("User disconnected");
            const username = connectedUser.get(socket.id);
            connectedUser.delete(socket.id);
            io.emit('message', {
                username: 'Server',
                message: `${username} left the chat`
            })
        })
    });
    
    return io;
}
const getUserSocket = (userId) => {
    return connectedUser.get(userId);
}

module.exports = {initializeSocket, getUserSocket};

