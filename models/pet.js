'use strict';

const mongoose = require('mongoose');
const capitalizeWords = require('../helperJS/capitalize');

const petSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    minlength: 2,
    maxlength: 14,
    set: capitalizeWords,
    required: true
  },
  birthday: {
    type: Date
  },
  species: {
    type: String,
    enum: ['Dog', 'Cat', 'Bird', 'Fish', 'Reptile', 'Other'],
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  authorized: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false
    }
  ],
  profilePicture: {
    type: String,
    default: '/images/index.png'
  }
});

const Pet = mongoose.model('pet', petSchema);

module.exports = Pet;
