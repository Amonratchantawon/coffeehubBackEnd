'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Shop Schema
 */
var ShopSchema = new Schema({
  name: {
    type: String,
    required: 'Please fill Shop name',
    trim: true
  },
  // shopid: {
  //   type: String,
  //   required: 'Please fill Shop shopid',
  //   trim: true
  // },
  address: {
    required: 'Please fill Shop address',
    type: [{
      address: String,
      distict: String,
      province: String,
      postcode: String
    }]
  },
  shopid: {
    type: String,
    required: 'Please fill Shop shopid',
    trim: true
  },

  phone: {
    type: String,
    required: 'Please fill Shop phone',
    trim: true
  },

  email: {
    type: String,
    required: 'Please fill Shop email',
    trim: true
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

mongoose.model('Shop', ShopSchema);
