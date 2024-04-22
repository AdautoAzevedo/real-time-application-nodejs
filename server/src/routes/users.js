const express = require('express');
const router = express.Router();
const userController = require('../controller/usersController');

router.route('/')
    .post(userController.storeNewUser);

router.route('/:index')
    .get(userController.getUserById)
    .delete(userController.deleteUser);

module.exports = router;