'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Employee Schema
 */
var EmployeeSchema = new Schema({
  empid: {
    type: String,
    required: 'Please fill Employee empid',
    trim: true
  },

  firsname: {
    type: String,
    required: 'Please fill Employee firsname',
    trim: true
  },

  lastname: {
    type: String,
    required: 'Please fill Employee lastname',
    trim: true
  },

  jobposition: {
    type: String,
    required: 'Please fill Employee jobposition',
    trim: true
  },
  phone: {
    type: String,
    required: 'Please fill Employee phone',
    trim: true
  },
  email: {
    type: String,
    required: 'Please fill Employee email',
    trim: true
  },

  shop_id: {
    required: 'Please fill Employee shop_id',
    type: Schema.ObjectId,
    ref: 'Shop'
  },

  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Employee', EmployeeSchema);
