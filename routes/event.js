const express = require('express');
const PetEvent = require('../models/event');
const Pet = require('../models/pet');
const Settings = require('../models/settings');

const router = express.Router();
const routeGuard = require('../middleware/route-guard');

router.get('/', routeGuard, (req, res, next) => {
  let fetchedEvents;
  Pet.find(
    { $or: [{ authorized: req.user.id }, { owner: req.user.id }] },
    { _id: 1 }
  )
    .then((pets) => {
      return PetEvent.find({ originPet: { $in: pets } });
    })
    .then((events) => {
      fetchedEvents = events;
      return Settings.findOne({ user: req.user.id });
    })
    .then((userSettings) => {
      const authorizedEvents = fetchedEvents.map((event) => {
        const type = event.type.toLowerCase().replace(/\s+/g, '');
        if (userSettings) event.color = userSettings.eventColors[type];
        return event;
      });
      res.json(authorizedEvents);
    })
    .catch((error) => next(error));
});

router.get('/professional', routeGuard, (req, res, next) => {
  let fetchedEvents;
  Pet.find({ 'medical.veterinarian': req.user.id })
    .then((pets) => {
      return PetEvent.find({
        originPet: { $in: pets },
        type: 'Vet Appointment'
      });
    })
    .then((events) => {
      fetchedEvents = events;
      return Settings.findOne({ user: req.user.id });
    })
    .then((userSettings) => {
      const authorizedEvents = fetchedEvents.map((event) => {
        const type = event.type.toLowerCase().replace(/\s+/g, '');
        if (userSettings) event.color = userSettings.eventColors[type];
        return event;
      });
      res.json({ authorizedEvents, colors: userSettings?.eventColors });
    })
    .catch((error) => next(error));
});

router.post('/create/', routeGuard, (req, res, next) => {
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
  console.log(from, to);
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
