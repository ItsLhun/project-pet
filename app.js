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
const bindUnreadMessagesToLocals = require('./middleware/unread-messages-to-locals.js');
const baseRouter = require('./routes/index');
const authenticationRouter = require('./routes/authentication');
const userProfileRouter = require('./routes/user');
const professionalRouter = require('./routes/professional');
const messageRouter = require('./routes/message');
const eventRouter = require('./routes/event');
const settingsRouter = require('./routes/settings');
const sessionConfig = require('./config/session');
const sassConfig = require('./config/sass');
const petRouter = require('./routes/pet.js');
const hbsJson = require('hbs-json');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, '/views/partials'));
hbs.registerHelper('json', hbsJson);
hbs.registerHelper('date', (value) => {
  return `${value.toLocaleDateString()} ${value.toLocaleTimeString('en-GB')}`;
});
hbs.registerHelper('ifEquals', function (arg1, arg2, options) {
  return arg1.toString() == arg2.toString()
    ? options.fn(this)
    : options.inverse(this);
});
hbs.registerHelper('ifNotEquals', function (arg1, arg2, options) {
  return arg1.toString() != arg2.toString()
    ? options.fn(this)
    : options.inverse(this);
});
app.use(serveFavicon(path.join(__dirname, 'public/images', 'paw-icon.png')));
app.use(sassMiddleware(sassConfig));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(flash());
app.use(expressSession(sessionConfig));
app.use(basicAuthenticationDeserializer);
app.use(bindUserToViewLocals);
app.use(bindUnreadMessagesToLocals);
app.use('/', baseRouter);
app.use('/authentication', authenticationRouter);
app.use('/user', userProfileRouter);
app.use('/professional', professionalRouter);
app.use('/event', eventRouter);
app.use('/pet', petRouter);
app.use('/message', messageRouter);
app.use('/settings', settingsRouter);

// Catch missing routes and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Catch all error handler
app.use((error, req, res, next) => {
  if (
    error.message === 'PASSWORD_TOO_SHORT' ||
    error.message === 'PASSWORD_CONTAINS_NO_UPPERCASE' ||
    error.message === 'PASSWORD_CONTAINS_NO_NUMBER'
  ) {
    req.flash(
      'passwordError',
      'Please make sure the password is at least 8 characters long and contains an uppercase letter and a number.'
    );
    res.redirect('/authentication/sign-up');
  } else if (error.message === 'PASSWORDS_DO_NOT_MATCH') {
    req.flash(
      'passwordMatchError',
      'Please make sure the two passwords you entered match.'
    );
    res.redirect('/authentication/sign-up');
  }
  // Set error information, with stack only available in development
  res.locals.message = error.message;
  res.locals.error = req.app.get('env') === 'development' ? error : {};
  res.status(error.status || 500);
  res.render('error');
});

module.exports = app;
