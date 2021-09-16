'use strict';

const express = require('express');
const router = express.Router();
const routeGuard = require('../middleware/route-guard');
const User = require('../models/user');

const parser = require('../middleware/cloudinary-parser');

router.get('/', routeGuard, (req, res, next) => {
  res.render('user/detail');
});

router.get('/edit', routeGuard, (req, res, next) => {
  res.render('user/edit');
});

router.post(
  '/edit',
  parser.single('profilePicture'),
  routeGuard,
  (req, res, next) => {
    const { id } = req.user;
    const { firstName, lastName, username, email } = req.body;
    console.log(firstName);
    let profilePicture;
    if (req.file) {
      profilePicture = req.file.path;
    }

    User.findByIdAndUpdate(id, {
      firstName,
      lastName,
      username,
      email,
      profilePicture
    })
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

module.exports = router;
