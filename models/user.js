'use strict';

const mongoose = require('mongoose');
const validateEmail = require('../helperJS/validateEmail');

const schema = new mongoose.Schema({
  name: {
    type: String,
    trim: true
  },
  username: {
    type: String,
    minlength: 3,
    required: true,
    trim: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true,
    validate: {
      validator: validateEmail,
      message: 'Please enter a valid email address.'
    }
  },
  profilePicture: {
    type: String,
    default: '/images/default-profile-picture.png'
  },
  passwordHashAndSalt: {
    type: String
  },
  pets: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Pet'
  }
});

const User = mongoose.model('User', schema);

module.exports = User;
