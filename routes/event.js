const express = require('express');
const PetEvent = require('../models/event');
const User = require('../models/user');
const Pet = require('../models/pet');

const router = express.Router();
const routeGuard = require('../middleware/route-guard');

router.get('/', routeGuard, (req, res, next) => {
  PetEvent.find({ originUser: req.user })
    .then((events) => res.json(events))
    .catch((error) => next(error));
});

router.post('/create', routeGuard, (req, res, next) => {
  const {
    from,
    to,
    title,
    type,
    originPet,
    description,
    isAllDay,
    showAlerts,
    repeatEvery,
    reapeatEnds,
    repeatEveryCustomValue,
    repeatEveryCustomType
  } = req.body;

  const originUser = req.user.id;

  PetEvent.create({
    from: new Date(from),
    to: new Date(to),
    title,
    description,
    isAllDay,
    showAlerts,
    repeatEvery,
    reapeatEnds,
    repeatEveryCustomValue,
    repeatEveryCustomType,
    originUser,
    type,
    originPet
  })
    .then((event) => {
      console.log(event._id);
      return Pet.findByIdAndUpdate(originPet, {
        $push: { petEvents: event._id }
      });
    })
    .then((pet) => {
      res.redirect('/');
    })
    .catch((error) => next(error));
});

router.post('/update', routeGuard, (req, res, next) => {
  const {
    id,
    from,
    to,
    title,
    description,
    isAllDay,
    showAlerts,
    repeatEvery,
    reapeatEnds,
    repeatEveryCustomValue,
    repeatEveryCustomType
  } = req.body;

  PetEvent.findByIdAndUpdate(id, {
    from,
    to,
    title,
    description,
    isAllDay,
    showAlerts,
    repeatEvery,
    reapeatEnds,
    repeatEveryCustomValue,
    repeatEveryCustomType
  })
    .then(() => res.redirect('/'))
    .catch((error) => next(error));
});

router.post('/delete', routeGuard, (req, res, next) => {
  const { id } = req.body;
  console.log(req.body);
  PetEvent.findByIdAndDelete(id)
    .then(() => res.redirect('/'))
    .catch((error) => next(error));
});

module.exports = router;
