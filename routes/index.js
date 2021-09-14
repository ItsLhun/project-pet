'use strict';

const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  if (req.session.userId) {
    res.render('dashboard');
  } else {
    res.render('home', { title: 'Hello World!' });
  }
});

module.exports = router;
