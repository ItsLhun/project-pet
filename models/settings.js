'use strict';

const mongoose = require('mongoose');

const eventColors = new mongoose.Schema({
  vetAppointmentColor: {
    type: String
  },
  groomingColor: {
    type: String
  },
  suppliesColor: {
    type: String
  },
  otherColor: {
    type: String
  }
});

const settingsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  eventColors: {
    type: eventColors
  }
});

const Settings = mongoose.model('Settings', settingsSchema);

module.exports = Settings;
