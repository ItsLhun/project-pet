'use strict';

const express = require('express');
const bcryptjs = require('bcryptjs');
const User = require('./../models/user');
const Professional = require('./../models/professional');

const passwordValidator = require('./../middleware/password-validator');

const router = express.Router();

router.get('/sign-up', (req, res, next) => {
  res.render('authentication/sign-up', { message: req.flash() });
});

router.post(
  '/sign-up',
  /*passwordValidator,*/ (req, res, next) => {
    const { firstName, lastName, username, email, password } = req.body;

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

router.get('/user-sign-in', (req, res, next) => {
  if (req.user) {
    res.render('dashboard');
  } else {
    res.render('authentication/sign-in', { message: req.flash() });
  }
});

router.post('/user-sign-in', (req, res, next) => {
  if (!req.user) {
    let user;
    const { emailOrUsername, password } = req.body;
    User.findOne()
      .or([{ username: emailOrUsername }, { email: emailOrUsername }])
      .then((document) => {
        if (!document) {
          return Promise.reject(new Error('NO_USER'));
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
          return Promise.reject(new Error('WRONG_PASSWORD'));
        }
      })
      .catch((error) => {
        if (error.message === 'WRONG_PASSWORD') {
          req.flash('passwordError', 'Wrong password.');
          res.redirect('/authentication/sign-in');
        } else if (error.message === 'NO_USER') {
          req.flash('userError', 'No user found with the username/email.');
          res.redirect('/authentication/user-sign-in');
        }
        next(error);
      });
  }
});

router.get('/prof-sign-in', (req, res, next) => {
  if (req.user) {
    res.render('dashboard');
  } else {
    res.render('authentication/prof-sign-in', { message: req.flash() });
  }
});

router.post('/prof-sign-in', (req, res, next) => {
  if (!req.user) {
    let user;
    const { emailOrUsername, password } = req.body;
    Professional.findOne()
      .or([{ username: emailOrUsername }, { email: emailOrUsername }])
      .then((document) => {
        if (!document) {
          return Promise.reject(new Error('NO_USER'));
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
          return Promise.reject(new Error('WRONG_PASSWORD'));
        }
      })
      .catch((error) => {
        if (error.message === 'WRONG_PASSWORD') {
          req.flash('passwordError', 'Wrong password.');
          res.redirect('/authentication/sign-in');
        } else if (error.message === 'NO_USER') {
          req.flash('userError', 'No user found with the username/email.');
          res.redirect('/authentication/prof-sign-in');
        }
        next(error);
      });
  }
});

router.post('/sign-out', (req, res, next) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
