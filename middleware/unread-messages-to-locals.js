'use strict';

const Message = require('../models/message');

module.exports = (req, res, next) => {
  let userId;
  if (req.user) userId = req.user.id;
  Message.countDocuments({ to: userId, read: false })
    .then((docs) => {
      if (docs) res.locals.unread = docs;
      next();
    })
    .catch((error) => next(error));
};
