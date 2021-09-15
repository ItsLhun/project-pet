const express = require('express');
const routeGuard = require('../middleware/route-guard');
const Pet = require('../models/pet');
const User = require('../models/user');

const petRouter = express.Router();

petRouter.get('/create', (req, res, next) => {
  res.render('create-pet');
});

petRouter.post('/create', routeGuard, (req, res, next) => {
  const { name, species, birthday, profilePicture } = req.body;
  let picture = profilePicture || '/images/index.png';
  const owner = req.session.userId;
  Pet.create({
    name,
    birthday,
    species,
    owner,
    profilePicture: picture // there's no way to trigger default image as both '' and null are valid parameters according to mongoose, hence default is defined above.
  })
    .then((pet) => {
      console.log('Pet created successfully,', pet);
      const petId = pet._id;
      console.log(petId);
      return User.findByIdAndUpdate(
        req.session.userId,
        { $push: { pets: petId } },
        { new: true }
      );
    })
    .then((userdoc) => {
      console.log(userdoc);
      res.redirect('/');
    })
    .catch((error) => next(error));
});

module.exports = petRouter;
