'use strict';

const express = require('express');
const router = express.Router();
const routeGuard = require('../middleware/route-guard');
const User = require('../models/user');
const Professional = require('../models/professional');
const Message = require('../models/message');
const Settings = require('../models/settings');

const parser = require('../middleware/cloudinary-parser');

router.get('/', routeGuard, (req, res, next) => {
  if (!req.session.userType) {
    Settings.findOne({ user: req.user.id })
      .then((userSettings) => {
        res.render('user/profile', { userSettings });
      })
      .catch((error) => next(error));
  } else {
    Settings.findOne({ profUser: req.user.id })
      .then((userSettings) => {
        res.render('user/profile', { userSettings });
      })
      .catch((error) => next(error));
  }
});

router.post('/search', routeGuard, (req, res, next) => {
  const searchTerm = req.body.searchTerm.trim();
  if (searchTerm !== '') {
    User.find({ username: new RegExp('^' + searchTerm, 'i') })
      .then((users) => res.send(users))
      .catch((error) => next(error));
  }
});

router.post('/available', (req, res, next) => {
  const searchTerm = req.body.searchTerm.trim();
  const { type } = req.body;
  if (searchTerm !== '') {
    if (type === 'username') {
      User.find({ username: searchTerm })
        .then((users) => res.send(users))
        .catch((error) => next(error));
    } else if (type === 'email') {
      User.find({ email: searchTerm })
        .then((users) => res.send(users))
        .catch((error) => next(error));
    }
  }
});

router.post('/edit', routeGuard, (req, res, next) => {
  const { id } = req.user;
  const { firstName, lastName, username, email, userType } = req.body;
  console.log(id);
  if (userType) {
    Professional.findByIdAndUpdate(id, {
      firstName,
      lastName,
      username,
      email
    })
      .then(() => res.redirect('/user'))
      .catch((error) => next(error));
  } else {
    console.log('hi2');
    User.findByIdAndUpdate(id, {
      firstName,
      lastName,
      username,
      email
    })
      .then(() => res.redirect('/user'))
      .catch((error) => next(error));
  }
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

router.get('/messages', routeGuard, (req, res, next) => {
  Message.find({ to: req.user.id })
    .populate('from')
    .populate('pet')
    .then((messages) => {
      res.render('user/messages', { messages });
    })
    .catch((error) => next(error));
});

module.exports = router;
