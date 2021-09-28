'use strict';

const mongoose = require('mongoose');
const validateEmail = require('../helperJS/validateEmail');
const capitalizeWords = require('../helperJS/capitalize');

const profSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    set: capitalizeWords,
    required: true
  },
  lastName: {
    type: String,
    trim: true,
    set: capitalizeWords,
    required: true
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
  type: {
    type: String,
    enum: ['Veterinarian', 'Walker', 'Pet Sitter', 'Groomer', 'Other'],
    required: true
  },
  profilePicture: {
    type: String,
    default: '/images/default-profile-picture.png'
  },
  passwordHashAndSalt: {
    type: String
  },
  assigned: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Pet'
    }
  ]
});

const Professional = mongoose.model('Professional', profSchema);

module.exports = Professional;
