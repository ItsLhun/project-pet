const express = require('express');
const PetEvent = require('../models/event');
const Pet = require('../models/pet');
const Settings = require('../models/settings');

const router = express.Router();
const routeGuard = require('../middleware/route-guard');

router.get('/', routeGuard, (req, res, next) => {
  let authorizedEvents;
  Pet.find(
    { $or: [{ authorized: req.user.id }, { owner: req.user.id }] },
    { _id: 1 }
  )
    .then((pets) => {
      return PetEvent.find({ originPet: { $in: pets } });
    })
    .then((events) => {
      authorizedEvents = events;
      return Settings.findOne({ user: req.user.id });
    })
    .then((userSettings) => {
      res.json({ authorizedEvents, colors: userSettings.eventColors });
    })
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
    repeatEveryCustomType,
    originPetName
  } = req.body;

  const originUser = req.user.id;

  PetEvent.create({
    from: new Date(from),
    to: new Date(to),
    title: `${originPetName}: ${title}`,
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
    .then(() => {
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

  let event;
  PetEvent.findByIdAndDelete(id)
    .then(() => res.redirect('/'))
    .catch((error) => next(error));
});

module.exports = router;
