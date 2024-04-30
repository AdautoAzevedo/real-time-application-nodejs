const socketIo = require('socket.io');
const messageController = require('../controller/messageController');

let io;
const connectedUser = {};
    

const initializeSocket = (server) => {
    io = socketIo(server);
    io.on('connection', (socket) => {
        console.log("User connected: ", socket.id);
    
        socket.on('login', (userId) => {
            connectedUser[userId] = socket.id;
            console.log(connectedUser);
            io.emit('userLogged', connectedUser);
        })
    
        socket.on('message', (message) => {
            const receiverSocket = connectedUser.get(message.receiverId);
            if (receiverSocket) {
                io.to(receiverSocket).emit('newMessage',message);
            }
        });
    
        socket.on('disconnect', () => {
            Object.keys(connectedUser).forEach((userId) => {
                if (connectedUser[userId] === socket.id) {
                    delete connectedUser[userId];
                }
            })
        })
    });
    
    return io;
}

module.exports = {initializeSocket, getUserSocket};

