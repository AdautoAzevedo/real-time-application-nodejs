const express = require('express');
const router = express.Router();
const messagesController = require('../controller/messageController');

router.route('/')
    .get(messagesController.getMessages)
    .post(messagesController.sendMessage);


module.exports = router;