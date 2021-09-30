'use strict';

const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  from: {
    type: Date,
    required: true
  },
  to: {
    type: Date,
    required: true
  },
  title: {
    type: String,
    trim: true,
    minlength: 2,
    maxlength: 25,
    required: true
  },
  description: {
    type: String,
    maxlength: 140,
    default: null
  },
  isAllDay: {
    type: Boolean,
    required: true,
    default: false
  },
  showAlerts: {
    type: Boolean,
    required: true,
    default: true
  },
  repeatEveryExcludeDays: {
    type: Date,
    required: false,
    default: null
  },
  repeatEveryExcludeDays: {
    type: Number, //TBC,
    default: null
  },
  repeatEvery: {
    type: Number
  },
  repeatEnds: {
    type: Date,
    required: false,
    default: null
  },
  repeatEveryCustomType: {
    type: Number
  },
  repeatEveryCustomValue: {
    type: Number,
    default: null
  },
  type: {
    type: String,
    enum: ['Vet Appointment', 'Supplies', 'Grooming', 'Other'],
    required: true
  },
  originPet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pet',
    required: true
  },
  originUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  color: {
    type: String,
    default: '#484848'
  }
});

eventSchema.set('toJSON', {
  transform: (doc, obj) => {
    obj.id = obj._id.toString();
    delete obj._id;
    delete obj.__v;
  }
});

const PetEvent = mongoose.model('PetEvent', eventSchema);

module.exports = PetEvent;
