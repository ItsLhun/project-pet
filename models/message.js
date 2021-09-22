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
      required: true,
      default: false
    },
    confirmed: {
      type: Boolean,
      required: true,
      default: false
    },
    status: {
      type: String,
      enum: ['Accepted', 'Declined', 'Pending'],
      required: true,
      default: 'Pending'
    }
  },
  { timestamps: { createdAt: 'sent' } }
);

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
