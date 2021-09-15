'use strict';

const path = require('path');
const express = require('express');
const hbs = require('hbs');
const createError = require('http-errors');
const expressSession = require('express-session');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');
const serveFavicon = require('serve-favicon');
const basicAuthenticationDeserializer = require('./middleware/basic-authentication-deserializer.js');
const bindUserToViewLocals = require('./middleware/bind-user-to-view-locals.js');
const baseRouter = require('./routes/index');
const authenticationRouter = require('./routes/authentication');
const userProfileRouter = require('./routes/user-profile');
const eventRouter = require('./routes/event');
const sessionConfig = require('./config/session');
const sassConfig = require('./config/sass');
const petRouter = require('./routes/pet.js');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, '/views/partials'));

app.use(serveFavicon(path.join(__dirname, 'public/images', 'favicon.ico')));
app.use(sassMiddleware(sassConfig));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(expressSession(sessionConfig));
app.use(basicAuthenticationDeserializer);
app.use(bindUserToViewLocals);

app.use('/', baseRouter);
app.use('/authentication', authenticationRouter);
app.use('/user-profile', userProfileRouter);
app.use('/event', eventRouter);
app.use('/pet', petRouter);

// Catch missing routes and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Catch all error handler
app.use((error, req, res, next) => {
  // Set error information, with stack only available in development
  res.locals.message = error.message;
  res.locals.error = req.app.get('env') === 'development' ? error : {};
  res.status(error.status || 500);
  res.render('error');
});

module.exports = app;
