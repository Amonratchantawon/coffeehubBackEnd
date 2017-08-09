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
    required: 'Please fill Order date',
    trim: true
  },

  receiptNo: {
    type: String,
    required: 'Please fill Order receiptNo',
    trim: true
  },

  change: {
    type: Number,
    required: 'Please fill Order change',
    trim: true
  },

  cash: {
    type: Number,
    required: 'Please fill Order cash',
    trim: true
  },

  netamount: {
    type: Number,
    required: 'Please fill Order netamount',
    trim: true
  },
  shop_id: {
    required: 'Please fill Order shop_id',
    type: Schema.ObjectId,
    ref: 'Shop'
  },
  emp_id: {
    required: 'Please fill Order emp_id',
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
