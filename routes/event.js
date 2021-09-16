const express = require('express');
const PetEvent = require('../models/event');
const router = express.Router();
const routeGuard = require('../middleware/route-guard');

router.get('/', routeGuard, (req, res, next) => {
  //
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
    repeatEveryCustomValue
  } = req.body;

  //PetEvent.create({});

  res.redirect('/');
});

router.post('/update', routeGuard, (req, res, next) => {
  console.log(req.body);

  res.redirect('/');
});

router.post('/delete', routeGuard, (req, res, next) => {
  const { id } = req.body;
  console.log(id);

  res.redirect('/');
});

module.exports = router;
