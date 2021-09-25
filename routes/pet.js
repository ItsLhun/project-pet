const express = require('express');
const routeGuard = require('../middleware/route-guard');
const upload = require('../middleware/cloudinary-parser');

const Pet = require('../models/pet');
const User = require('../models/user');
const PetEvent = require('../models/event');
const petRouter = express.Router();

petRouter.get('/', routeGuard, (req, res, next) => {
  Pet.find({ owner: req.user })
    .populate('authorized')
    .then((pets) => {
      pets.forEach((p) => console.log(p.authorized));
      res.json(pets);
    })
    .catch((error) => next(error));
});

petRouter.get('/create', (req, res, next) => {
  res.render('pet/create-pet');
});

petRouter.get('/events', routeGuard, (req, res, next) => {
  const { id } = req.body;
  PetEvent.find({ originPet: id })
    .then((pets) => {
      res.json(pets);
    })
    .catch((error) => next(error));
});

petRouter.post(
  '/create',
  routeGuard,
  upload.single('image'),
  (req, res, next) => {
    const { name, species, birthday } = req.body;
    let image;

    if (req.file) {
      image = req.file.path;
    } else {
      image = '/images/index.png';
    }
    const owner = req.user;
    Pet.create({
      name,
      birthday,
      species,
      owner,
      profilePicture: image // there's no way to trigger default image as both '' and null are valid parameters according to mongoose, hence default is defined above.
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
  }
);

petRouter.post(
  '/upload-picture/:id',
  routeGuard,
  upload.single('profilePicture'),
  (req, res, next) => {
    const { id } = req.params;
    let profilePicture;
    if (req.file) {
      profilePicture = req.file.path;
    }
    Pet.findByIdAndUpdate(id, { profilePicture }, { new: true })
      .then((returnedPet) => {
        res.redirect(`/pet/${id}`);
      })
      .catch((error) => {
        next(error);
      });
  }
);

petRouter.get('/:id', routeGuard, (req, res, next) => {
  const { id } = req.params;
  let pet;
  Pet.findById(id)
    .then((returnedPet) => {
      pet = returnedPet;
      console.log(pet.authorized.includes(req.user.id));
      if (
        pet.owner.toString() == req.user.id ||
        pet.authorized.includes(req.user.id)
      ) {
        return PetEvent.find({ originPet: id });
      } else {
        throw new Error('Not Authorized to see this pet');
      }
    })
    .then((events) => {
      res.render('pet/profile', { pet, events });
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = petRouter;
