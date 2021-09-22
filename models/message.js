'use strict';

const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
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
    },
    pet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Pet',
      required: true
    },
    note: {
      type: String
    },
    read: {
      type: Boolean,
      required: true
    },
    status: {
      type: String,
      enum: ['Confirmed', 'Declined', 'Pending'],
      required: true
    }
  },
  { timestamps: { createdAt: 'sentAt' } }
);

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
