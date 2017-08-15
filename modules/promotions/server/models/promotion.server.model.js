'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Promotion Schema
 */
var PromotionSchema = new Schema({
  name: {
    type: String,
    required: 'Please fill Promotion name',
    trim: true
  },
  code: {
    type: String,
    required: 'Please fill Promotion code',
    trim: true
  },

  startdate: {
    type: Date,
    required: 'Please fill Promotion startdatev',
    trim: true
  },

  enddate: {
    type: Date,
    required: 'Please fill Promotion enddate',
    trim: true
  },

  status: {
    type: String,
    enum: ['activate', 'inactivate'],
    default: ['inactivate']
  },

  log: [{
    user: {
      type: Schema.ObjectId,
      ref: 'User'
    },
    date: {
      type: Date,
      default: Date.now
    }
  }],

  detail: {
    type: String,
    required: 'Please fill Promotion detail',
    trim: true
  },
  discounttype: {
    required: 'Please fill Promotion discounttype',
    type: [{
      type: String,
      enum: ['Baht', 'Percent']
    }],
  },
  value: Number,

  shop_id: {
    required: 'Please fill Product shop_id',
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

mongoose.model('Promotion', PromotionSchema);
