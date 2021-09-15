'use strict';

const express = require('express');
const User = require('../models/user');
const router = express.Router();

router.get('/', (req, res, next) => {
  if (req.session.userId) {
    let user;
    User.findById(req.session.userId)
      .populate('pets')
      .then((documentUser) => {
        user = documentUser;
        console.log(user);
        res.render('dashboard', user);
      })
      .catch((error) => {
        next(error);
      });
  } else {
    res.render('home', { title: 'Hello World!' });
  }
});

module.exports = router;
