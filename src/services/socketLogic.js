const socketIo = require('socket.io');

const initializeSocket = (server) => {
    const io = socketIo(server);
    const connectedUser = new Map();
    
    io.on('connection', (socket) => {
        console.log("User connected: ", socket.id);
    
        socket.on('login', (username) => {
            connectedUser.set(socket.id, username);
            io.emit('message', {
                username: 'Server', 
                message: `${username} joined the chat`
            })
        })
    
        socket.on('message', (data) => {
            const username = connectedUser.get(socket.id);
            io.emit('message',{
                username,
                message: data
            });
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

module.exports = initializeSocket;

