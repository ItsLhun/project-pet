'use strict';

const express = require('express');
const router = express.Router();
const routeGuard = require('../middleware/route-guard');
const User = require('../models/user');
const Message = require('../models/message');
const Pet = require('../models/pet');

router.post('/delete/:id', (req, res, next) => {
  const { id } = req.params;

  Message.findByIdAndDelete(id)
    .then(() => res.redirect('/user/messages'))
    .catch((error) => next(error));
});

router.post('/read/:id', (req, res, next) => {
  const { id } = req.params;
  Message.findByIdAndUpdate(id, { read: true })
    .then(() => res.redirect('/user/messages'))
    .catch((error) => next(error));
});

router.post('/authorize/:petId', routeGuard, (req, res, next) => {
  const { petId } = req.params;
  const { username, note, type } = req.body;
  console.log(type);
  User.findOne({ username })
    .then((user) => {
      return Message.create({
        from: req.user.id,
        to: user.id,
        type,
        pet: petId,
        note
      });
    })
    .then(() => res.redirect(`/pet/${petId}`))
    .catch((error) => next(error));
});

router.post('/respond/:id', routeGuard, (req, res, next) => {
  const status = req.body.accept || req.body.decline;
  const { id } = req.params;

  Message.findByIdAndUpdate(id, { status, confirmed: true }, { new: true })
    .then((updatedMessage) => {
      if (status === 'Accepted') {
        switch (updatedMessage.type) {
          case 'Pet Access Invitation':
            return Pet.findByIdAndUpdate(updatedMessage.pet, {
              $addToSet: { authorized: req.user.id }
            });
          case 'Vet Appointment Request':
            break;
          case 'Ownership Transfer Request':
            return Pet.findByIdAndUpdate(updatedMessage.pet, {
              owner: req.user.id,
              $pull: { authorized: req.user.id }
            });
        }
      }
    })
    .then(() => res.redirect('/user/messages'))
    .catch((error) => next(error));
});

module.exports = router;
