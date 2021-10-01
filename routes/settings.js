'use strict';

const express = require('express');
const router = express.Router();
const routeGuard = require('../middleware/route-guard');
const Settings = require('../models/settings');

router.post('/update/eventcolors', routeGuard, (req, res, next) => {
  if (!req.session.userType) {
    Settings.findOne({ user: req.user.id })
      .then((settings) => {
        if (!settings) {
          return Settings.create({
            user: req.user,
            eventColors: req.body
          });
        } else {
          return Settings.findOneAndUpdate({
            user: req.user.id,
            eventColors: req.body
          });
        }
      })
      .then(() => res.redirect('/user'));
  } else {
    Settings.findOne({ profUser: req.user.id })
      .then((settings) => {
        if (!settings) {
          return Settings.create({
            profUser: req.user.id,
            eventColors: req.body
          });
        } else {
          console.log(req.user.id);
          return Settings.findOneAndUpdate({
            profUser: req.user.id,
            eventColors: req.body
          });
        }
      })
      .then(() => res.redirect('/user'));
  }
});

module.exports = router;
