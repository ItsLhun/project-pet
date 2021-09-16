const express = require('express');
const routeGuard = require('../middleware/route-guard');
const Pet = require('../models/pet');
const User = require('../models/user');

const petRouter = express.Router();

petRouter.get('/create', (req, res, next) => {
  res.render('pet/create-pet');
});

petRouter.post('/create', routeGuard, (req, res, next) => {
  const { name, species, birthday, profilePicture } = req.body;
  let picture = profilePicture || '/images/index.png';
  const owner = req.user;
  Pet.create({
    name,
    birthday,
    species,
    owner,
    profilePicture: picture // there's no way to trigger default image as both '' and null are valid parameters according to mongoose, hence default is defined above.
  })
    .then((pet) => {
      const petId = pet._id;
      return User.findByIdAndUpdate(
        req.session.userId,
        { $push: { pets: petId } },
        { new: true }
      );
    })
    .then((userdoc) => {
      res.redirect('/');
    })
    .catch((error) => next(error));
});

petRouter.get('/:id', (req, res, next) => {
  const { id } = req.params;
  Pet.findById(id)
    .then((returnedPet) => {
      res.render('pet/profile', returnedPet);
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = petRouter;
