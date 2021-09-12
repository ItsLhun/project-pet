'use strict';

const mongoose = require('mongoose');
const capitalizeWords = require('./../helperJS/capitlize');

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
  }
});

const Pet = mongoose.model('pet', petSchema);

module.exports = Pet;