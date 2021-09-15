'use strict';

const express = require('express');
const bcryptjs = require('bcryptjs');
const User = require('./../models/user');
const passwordValidator = require('./../middleware/password-validator');

const router = express.Router();

router.get('/sign-up', (req, res, next) => {
  res.render('authentication/sign-up');
});

router.post(
  '/sign-up',
  //passwordValidator,
  (req, res, next) => {
    const { firstName, lastName, username, email, password } = req.body;
    console.log(req.body);
    bcryptjs
      .hash(password, 10)
      .then((hash) => {
        return User.create({
          firstName,
          lastName,
          username,
          email,
          passwordHashAndSalt: hash
        });
      })
      .then((user) => {
        req.session.userId = user._id;
        res.redirect('/');
      })
      .catch((error) => {
        next(error);
      });
  }
);

router.get('/sign-in', (req, res, next) => {
  if (req.session.userId) {
    res.render('dashboard');
  } else {
    res.render('authentication/sign-in');
  }
});

router.post('/sign-in', (req, res, next) => {
  if (!req.session.userId) {
    let user;
    const { emailOrUsername, password } = req.body;
    User.findOne()
      .or([{ username: emailOrUsername }, { email: emailOrUsername }])
      .then((document) => {
        if (!document) {
          return Promise.reject(
            new Error("There's no user with that email or username.")
          );
        } else {
          user = document;
          return bcryptjs.compare(password, user.passwordHashAndSalt);
        }
      })
      .then((result) => {
        if (result) {
          req.session.userId = user._id;
          res.redirect('/');
        } else {
          return Promise.reject(new Error('Wrong password.'));
        }
      })
      .catch((error) => {
        next(error);
      });
  }
});

router.post('/sign-out', (req, res, next) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
