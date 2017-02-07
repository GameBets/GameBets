var chatModel = require('./chat.model');

var chatController = {};

chatController.chatInsertMessage = function(req, res, next) {
  chatModel.insertMessage(req.body, function(error, data) {
    if (!error) {
      res.status(200).json(data);
    } else {
      res.status(404).send(data);
    }
  });
};

chatController.chatGetMessages = function(req, res, next) {
  chatModel.getMessages(function(error, data) {
    if (!error) {
      res.status(200).json(data);
    } else {
      res.status(404).send(data);
    }
  });
};

module.exports = chatController;
