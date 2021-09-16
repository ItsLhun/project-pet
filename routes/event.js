const express = require('express');
const Event = require('../models/event');
const router = express.Router();
const routeGuard = require('../middleware/route-guard');

router.get('/', routeGuard, (req, res, next) => {
  //
});

router.post('/create', routeGuard, (req, res, next) => {
  //
});

router.post('/update', routeGuard, (req, res, next) => {
  //
});

router.post('/delete', routeGuard, (req, res, next) => {
  //
});

module.exports = router;
