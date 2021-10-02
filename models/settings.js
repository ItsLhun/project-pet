'use strict';

const mongoose = require('mongoose');

const eventColors = new mongoose.Schema({
  vetappointment: {
    type: String,
    default: '484848'
  },
  grooming: {
    type: String,
    default: '484848'
  },
  supplies: {
    type: String,
    default: '484848'
  },
  other: {
    type: String,
    default: '484848'
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
