'use strict';

const mongoose = require('mongoose');
const capitalizeWords = require('../helperJS/capitalize');

const getPetDate = (date) => {
  if (date) {
    return date.toLocaleDateString('en-GB');
  } else {
    return date;
  }
};

const petSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    minlength: 2,
    maxlength: 20,
    set: capitalizeWords,
    required: true
  },
  birthday: {
    type: Date,
    default: Date.now,
    get: getPetDate
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

const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;
