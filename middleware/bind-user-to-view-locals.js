'use strict';

module.exports = (req, res, next) => {
  res.locals.user = req.user;
  console.log('requsermiddle', req.user);
  // res.locals.type = req.user.type;
  next();
};
