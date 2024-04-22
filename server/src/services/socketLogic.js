const socketIo = require('socket.io');
const messageController = require('../controller/messageController');

let io;
const connectedUser = new Map();
    

const initializeSocket = (server) => {
    io = socketIo(server);
    io.on('connection', (socket) => {
        console.log("User connected: ", socket.id);
    
        socket.on('login', (username) => {
            connectedUser.set(username, socket.id);
            console.log(connectedUser);
            io.emit('userLogged',  Array.from(connectedUser.keys()));
        })
    
        socket.on('message', (message) => {
            const receiverSocket = connectedUser.get(message.receiverId);
            if (receiverSocket) {
                io.to(receiverSocket).emit('newMessage',message);
            }
        });
    
        socket.on('disconnect', () => {
            console.log("User disconnected");
            const user = connectedUser.get(username);
            connectedUser.delete(username);
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

