'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Order Schema
 */
var OrderSchema = new Schema({

  items: {
    required: 'Please fill Order items',
    type: [{
      product_id: String,
      amount: Number,
      qty: Number
    }]
  },

  date: {
    type: Date,
    required: 'Please fill Product date',
    trim: true
  },

  receiptNo: {
    type: String,
    required: 'Please fill Product receiptNo',
    trim: true
  },

  change: {
    type: Number,
    required: 'Please fill Product change',
    trim: true
  },

  cash: {
    type: Number,
    required: 'Please fill Product cash',
    trim: true
  },

  netamount: {
    type: Number,
    required: 'Please fill Product netamount',
    trim: true
  },
  shop_id: {
    required: 'Please fill Product shop_id',
    type: Schema.ObjectId,
    ref: 'Shop'
  },
  emp_id: {
    required: 'Please fill Product emp_id',
    type: Schema.ObjectId,
    ref: 'Employee'
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

mongoose.model('Order', OrderSchema);
