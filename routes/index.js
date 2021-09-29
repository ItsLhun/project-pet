'use strict';

const express = require('express');
const Pet = require('../models/pet');
const User = require('../models/user');
const Professional = require('../models/professional');
const router = express.Router();

router.get('/', (req, res, next) => {
  if (req.session.userId) {
    let user;
    if (req.session.userType) {
      Professional.findById(req.session.userId)
        .then((documentUser) => {
          user = documentUser;
          res.render('prof-dashboard', user);
        })
        .catch((error) => {
          next(error);
        });
    } else {
      User.findById(req.session.userId)
        .then((documentUser) => {
          user = documentUser;
          return Pet.find({
            $or: [{ authorized: req.user.id }, { owner: req.user.id }]
          });
        })
        .then((authorizedPets) => {
          user.authorizedPets = authorizedPets;
          res.render('dashboard', user);
        })
        .catch((error) => {
          next(error);
        });
    }
  } else {
    res.render('home', { layout: false });
  }
});

module.exports = router;
