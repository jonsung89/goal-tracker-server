'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const GoalSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  details: {
    type: String
  },
  createdDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Goal', GoalSchema);