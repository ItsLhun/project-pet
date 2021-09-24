'use strict';

const User = require('./../models/user');
const Professional = require('./../models/professional');

module.exports = (req, res, next) => {
  const userId = req.session.userId;
  const type = req.session.userType;
  if (type && userId) {
    Professional.findById(userId)
      .then((user) => {
        req.user = user;
        next();
      })
      .catch((error) => {
        next(error);
      });
  } else if (userId) {
    User.findById(userId)
      .then((user) => {
        req.user = user;
        next();
      })
      .catch((error) => {
        next(error);
      });
  } else {
    next();
  }
};
