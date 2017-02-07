'use strict';

var express = require('express');
var router = express.Router();
var chatController = require('./chat.controller');

router.post('/chat_insertMessage', chatController.chatInsertMessage);
router.get('/chat_getMessages', chatController.chatGetMessages);

module.exports = router;
