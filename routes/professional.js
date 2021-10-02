'use strict';

const express = require('express');
const profRouter = express.Router();
const routeGuard = require('../middleware/route-guard');
const Professional = require('../models/professional');
const Message = require('../models/message');
const parser = require('../middleware/cloudinary-parser');

profRouter.post('/search/:field/:type', routeGuard, (req, res, next) => {
  if (req.params.field == 'username') {
    if (req.params.type == 'veterinarian') {
      const rawSearchTerm = req.body.searchTerm.trim();
      if (rawSearchTerm !== '') {
        let searchTerm = rawSearchTerm;
        Professional.find({ username: new RegExp('^' + searchTerm, 'i') })
          .then((professionals) => res.send(professionals))
          .catch((error) => next(error));
      }
    }
  } else if (req.params.field == 'name') {
    if (req.params.type == 'veterinarian') {
      const rawSearchTerm = req.body.searchTerm.trim();
      if (rawSearchTerm !== '') {
        let searchTerm = rawSearchTerm;
        Professional.find()
          .then((professionals) => {
            let filtered = professionals.filter((professional) => {
              let letFullVetName = `${professional.firstName} ${professional.lastName}`;
              return letFullVetName
                .toLowerCase()
                .includes(rawSearchTerm.toLowerCase());
            });
            res.send(filtered);
          })
          .catch((error) => next(error));
      }
    }
    // if (searchTerm !== '') {
    //   Pet.find(
    //     {
    //       'medical.veterinarian': req.session.userId
    //     },
    //     { authorized: 0, profilePicture: 0 }
    //   )
    //     .populate('owner')
    //     .then((pets) => {
    //       let filtered = pets.filter((pet) => {
    //         let petOwnerName = `${pet.owner.firstName} ${pet.owner.lastName}`;
    //         return petOwnerName
    //           .toLowerCase()
    //           .includes(searchTerm.toLowerCase());
    //       });
    //       res.send(filtered);
    //     })
    //     .catch((error) => next(error));
    // }
  }
});

profRouter.post(
  '/upload-picture',
  routeGuard,
  parser.single('profilePicture'),
  (req, res, next) => {
    const { id } = req.user;
    let profilePicture;
    if (req.file) {
      profilePicture = req.file.path;
    }
    console.log('test', profilePicture);
    Professional.findByIdAndUpdate(
      id,
      { profilePicture: profilePicture },
      { new: true }
    )
      .then(() => res.redirect('/user'))
      .catch((error) => next(error));
  }
);
module.exports = profRouter;
