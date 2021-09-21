'use strict';

const express = require('express');
const router = express.Router();
const routeGuard = require('../middleware/route-guard');
const User = require('../models/user');
const Message = require('../models/message');

const parser = require('../middleware/cloudinary-parser');

router.get('/', routeGuard, (req, res, next) => {
  res.render('user/profile');
});

router.post('/search', routeGuard, (req, res, next) => {
  const searchTerm = req.body.searchTerm.trim();

  if (searchTerm !== '') {
    User.find({ username: new RegExp('^' + searchTerm, 'i') })
      .then((users) => res.send(users))
      .catch((error) => next(error));
  }
});

router.post('/edit', routeGuard, (req, res, next) => {
  const { id } = req.user;
  const { firstName, lastName, username, email } = req.body;

  User.findByIdAndUpdate(id, {
    firstName,
    lastName,
    username,
    email
  })
    .then(() => res.redirect('/user'))
    .catch((error) => next(error));
});

router.post(
  '/upload-picture',
  routeGuard,
  parser.single('profilePicture'),
  (req, res, next) => {
    const { id } = req.user;
    let profilePicture;
    if (req.file) {
      profilePicture = req.file.path;
    }
    console.log('test', profilePicture);
    User.findByIdAndUpdate(
      id,
      { profilePicture: profilePicture },
      { new: true }
    )
      .then(() => res.redirect('/user'))
      .catch((error) => next(error));
  }
);

router.get('/settings', routeGuard, (req, res, next) => {
  res.render('user/settings');
});

router.post('/settings', routeGuard, (req, res, next) => {
  // Do stuff here to update settings
});

router.get('/messages', routeGuard, (req, res, next) => {
  Message.find({ to: req.user.id })
    .then((messages) => {
      console.log(messages);
      res.render('user/messages');
    })
    .catch((error = next(error)));
});

router.post('/authorize/:petId', (req, res, next) => {
  const { petId } = req.params;
  const { username } = req.body;

  User.findOne({ username })
    .then((user) => {
      return Message.create({
        from: req.user.id,
        to: user.id,
        type: 'Pet Access Invitation',
        pet: petId,
        read: false,
        confirmed: 'Pending'
      });
    })
    .then(() => res.redirect(`/pet/${petId}`))
    .catch((error) => next(error));
});

module.exports = router;
