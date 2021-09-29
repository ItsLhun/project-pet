'use strict';

module.exports = (req, res, next) => {
  res.locals.root_url = process.env.ROOT_URL;
  next();
};
