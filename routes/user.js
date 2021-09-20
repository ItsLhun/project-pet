'use strict';

const express = require('express');
const router = express.Router();
const routeGuard = require('../middleware/route-guard');
const User = require('../models/user');

const parser = require('../middleware/cloudinary-parser');

router.get('/', routeGuard, (req, res, next) => {
  res.render('user/profile');
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
    const { id } = req.params;
    let profilePicture;
    if (req.file) {
      profilePicture = req.file.path;
    }

    User.findByIdAndUpdate(id, { profilePicture: profilePicture })
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
  res.render('user/messages');
});

module.exports = router;
