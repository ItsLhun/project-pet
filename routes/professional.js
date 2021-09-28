'use strict';

const express = require('express');
const profRouter = express.Router();
const routeGuard = require('../middleware/route-guard');
const Professional = require('../models/professional');
const Message = require('../models/message');

profRouter.post('/search/:field/:type', routeGuard, (req, res, next) => {
  if (req.params.field == 'username') {
    if (req.params.type == 'veterinarian') {
      const rawSearchTerm = req.body.searchTerm.trim();
      if (rawSearchTerm !== '') {
        let searchTerm = rawSearchTerm;
        Professional.find({ username: new RegExp('^' + searchTerm, 'i') })
          .then((professionals) => res.send(professionals))
          .catch((error) => next(error));
      }
    }
  }
});

module.exports = profRouter;
