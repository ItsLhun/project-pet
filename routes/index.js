'use strict';

const express = require('express');
const router = express.Router();
const routeGuard = require('./../middleware/route-guard');
const User = require('./../models/user');

router.get('/', (req, res, next) => {
  if (req.session.userId) {
    res.render('dashboard');
  } else {
    res.render('home', { title: 'Hello World!' });
  }
});

router.get('/user-profile', routeGuard, (req, res, next) => {
  res.render('user-profile/detail');
});

router.get('/user-profile/edit', routeGuard, (req, res, next) => {
  res.render('user-profile/edit');
});

router.post('/user-profile/edit', routeGuard, (req, res, next) => {
  const { id } = req.user;
  const { name, username, email } = req.body;

  User.findByIdAndUpdate(id, { name, username, email })
    .then(() => res.redirect('/user-profile'))
    .catch((error) => next(error));
});

module.exports = router;
