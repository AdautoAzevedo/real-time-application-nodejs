const Message = require('../model/message');
const User = require('../model/user');
const io = require('../services/socketLogic');

const sendMessage = async (req, res) => {
    const { senderId, receiverId, content} = req.body;
    console.log(senderId);
    console.log(receiverId);
    console.log(content);

    try {
        /* const sender = await User.findeByPk(senderId);
        const receiver = await User.findeByPk(receiverId);

        if (!sender || !receiver) {
            return res.status(404).json({message: 'Sender or receiver not found'});
        }

        const message = await Message.create({
            senderId,
            receiverId,
            content
        }); */

        const message = {
            senderId,
            receiverId,
            content
        }

        console.log(message);

        const receiverSocket = io.getUserSocket(receiverId);
        if (receiverSocket) {
            receiverSocket.emit('newMessage', message);
        }

        return res.status(201).json({message});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message});
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
module.exports = { sendMessage, getMessages };
