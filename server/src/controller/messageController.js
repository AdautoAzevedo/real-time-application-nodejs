const Message = require('../model/message');
const User = require('../model/user');
const io = require('../services/socketLogic');
const socketIo = require('socket.io');

const addMessage = async (req, res) => {
    const { senderId, receiverId, content} = req.body;
    try {
        const sender = await User.findByPk(senderId);
        const receiver = await User.findByPk(receiverId);
        
        if (!sender || !receiver) {
            console.log("Sender or receiver not found");
            return;
        }
        const messageSaved = await Message.create({
            content,
            sender_id: senderId,
            receiver_id: receiverId
        });

        return res.status(201).json({messageFromServer: "Message saved sucessfully"});

    } catch (error) {
        console.error(error);
    }
}


const getMessages = async (req, res) => {
    const {senderId, receiverId} = req.body;

    try {

        const messages = {
            senderId,
            receiverId,
            content: "Message received"
        }
       /*  const messages = await Message.findAll({
            where: {
                senderId,
                receiverId
            },
            order: [['createdAt', 'ASC']]
        }); */

        callback({data: messages});
    } catch (error) {
        console.error('Error retrieving messages:', error);
        // Send error response back to the client
        callback({ error: 'Internal server error.' });
    }
}
module.exports = { addMessage, getMessages };
