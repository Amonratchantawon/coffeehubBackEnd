'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Product Schema
 */
var ProductSchema = new Schema({
  name: {
    type: String,
    required: 'Please fill Product name',
    trim: true
  },

  image: {
    type: [{ id: String, url: String }],
    required: 'Please fill Product image',
    trim: true
  },
  price: {
    type: Number,
    required: 'Please fill Product price',
    trim: true
  },

  shop_id: {
    required: 'Please fill Product shop_id',
    type: Schema.ObjectId,
    ref: 'Shop'
  },

  category: {
    required: 'Please fill Product category',
    type: [{
      name: String,
      detail: String,
      subcate: String
    }]
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

mongoose.model('Product', ProductSchema);
