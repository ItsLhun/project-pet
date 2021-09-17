const express = require('express');
const PetEvent = require('../models/event');
const router = express.Router();
const routeGuard = require('../middleware/route-guard');

router.get('/', routeGuard, (req, res, next) => {
  PetEvent.find()
    .then((events) => res.json(events))
    .catch((error) => next(error));
});

router.post('/create', routeGuard, (req, res, next) => {
  const {
    from,
    to,
    title,
    description,
    isAllDay,
    showAlerts,
    reapeatEnds,
    repeatEveryCustomValue,
    repeatEveryCustomType
  } = req.body;
  const originUser = req.user.id;

  //Hard coded test values
  const type = 'Supplies';
  const originPet = '';

  PetEvent.create({
    from: new Date(from),
    to: new Date(to),
    title,
    description,
    isAllDay,
    showAlerts,
    reapeatEnds,
    repeatEveryCustomValue,
    repeatEveryCustomType,
    originUser,
    type
  })
    .then(() => res.redirect('/'))
    .catch((error) => next(error));
});

router.post('/update', routeGuard, (req, res, next) => {
  console.log(req.body);

  res.redirect('/');
});

router.post('/delete', routeGuard, (req, res, next) => {
  //const { id } = req.body;
  const id = '614486837bb1c46ef58f79cc';

  PetEvent.findByIdAndDelete(id)
    .then(() => res.redirect('/'))
    .catch((error) => next(error));
});

module.exports = router;
