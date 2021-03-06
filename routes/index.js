'use strict';

const express = require('express');
const Pet = require('../models/pet');
const User = require('../models/user');
const Event = require('../models/event');

const Professional = require('../models/professional');
const router = express.Router();

router.get('/', (req, res, next) => {
  if (req.session.userId) {
    let user;
    if (req.session.userType) {
      Professional.findById(req.session.userId)
        .then((documentUser) => {
          user = documentUser;
          if (user.type == 'Veterinarian') {
            return (
              Pet.find(
                {
                  'medical.veterinarian': req.session.userId
                },
                { authorized: 0, profilePicture: 0 }
              )
                .then((pets) => {
                  user.pets = pets;
                  //get count of upcoming events not counting past
                  return Event.countDocuments({
                    originPet: { $in: pets },
                    type: 'Vet Appointment',
                    from: { $gte: new Date() }
                  });
                })
                // .countDocuments()
                .then((count) => {
                  user.eventCount = count;
                  res.render('prof-dashboard', user);
                })
                .catch((error) => next(error))
            );
          } else {
            // placeholder to implementing other types of professional
            res.render('prof-dashboard', user);
          }
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
