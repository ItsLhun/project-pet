'use strict';

const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['Vet Appointment Request', 'Pet Access Invitation'],
    required: true
  }
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
