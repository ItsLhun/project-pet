'use strict';

const mongoose = require('mongoose');

const eventColors = new mongoose.Schema({
  vetappointment: {
    type: String
  },
  grooming: {
    type: String
  },
  supplies: {
    type: String
  },
  other: {
    type: String
  }
});

const settingsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  profUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Professional'
  },
  eventColors: {
    type: eventColors
  }
});

const Settings = mongoose.model('Settings', settingsSchema);

module.exports = Settings;
