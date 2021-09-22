'use strict';

const express = require('express');
const router = express.Router();
const routeGuard = require('../middleware/route-guard');
const User = require('../models/user');
const Message = require('../models/message');

router.post('/authorize/:petId', (req, res, next) => {
  const { petId } = req.params;
  const { username } = req.body;

  User.findOne({ username })
    .then((user) => {
      return Message.create({
        from: req.user.id,
        to: user.id,
        type: 'Pet Access Invitation',
        pet: petId
      });
    })
    .then(() => res.redirect(`/pet/${petId}`))
    .catch((error) => next(error));
});

router.post('/respond/:id', (req, res, next) => {
  const status = req.body.confirm || req.body.decline;
  const { id } = req.params;

  Message.findByIdAndUpdate(id, { status, confirmed: true })
    .then(() => {
      res.redirect('/user/messages');
    })
    .catch((error) => next(error));
});

module.exports = router;
