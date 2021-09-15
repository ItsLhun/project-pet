const express = require('express');
const routeGuard = require('../middleware/route-guard');
const Pet = require('../models/pet');

const petRouter = express.Router();

petRouter.get('/create', (req, res, next) => {
  res.render('create-pet');
});

petRouter.post('/create', routeGuard, (req, res, next) => {
  const { name, species, birthday, profilePicture } = req.body;
  const owner = req.session.userId;
  Pet.create({
    name,
    birthday,
    species,
    owner,
    authorized: null,
    profilePicture
  })
    .then((pet) => {
      console.log('Pet created successfully,', pet);
      res.redirect('/');
    })
    .catch((error) => next(error));
});

module.exports = petRouter;
