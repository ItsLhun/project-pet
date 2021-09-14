'use strict';

const express = require('express');
const router = express.Router();
const routeGuard = require('./../middleware/route-guard');
const User = require('./../models/user');

router.get('/', routeGuard, (req, res, next) => {
  res.render('user-profile/detail');
});

router.get('/edit', routeGuard, (req, res, next) => {
  res.render('user-profile/edit');
});

router.post('/edit', routeGuard, (req, res, next) => {
  const { id } = req.user;
  const { name, username, email } = req.body;

  User.findByIdAndUpdate(id, { name, username, email })
    .then(() => res.redirect('/user-profile'))
    .catch((error) => next(error));
});

router.get('/settings', routeGuard, (req, res, next) => {
  res.render('user-profile/settings');
});

router.post('/settings', routeGuard, (req, res, next) => {
  // Do stuff here to update settings
});

module.exports = router;
