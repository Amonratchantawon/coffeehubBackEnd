'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Promotion = mongoose.model('Promotion'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Promotion
 */
exports.create = function (req, res) {
  var promotion = new Promotion(req.body);
  promotion.user = req.user;

  promotion.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(promotion);
    }
  });
};

/**
 * Show the current Promotion
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var promotion = req.promotion ? req.promotion.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  promotion.isCurrentUserOwner = req.user && promotion.user && promotion.user._id.toString() === req.user._id.toString();

  res.jsonp(promotion);
};

/**
 * Update a Promotion
 */
exports.update = function (req, res) {
  var promotion = req.promotion;

  promotion = _.extend(promotion, req.body);

  promotion.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(promotion);
    }
  });
};

/**
 * Delete an Promotion
 */
exports.delete = function (req, res) {
  var promotion = req.promotion;

  promotion.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(promotion);
    }
  });
};

/**
 * List of Promotions
 */
exports.list = function (req, res) {
  Promotion.find().sort('-created').populate('user', 'displayName').exec(function (err, promotions) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(promotions);
      //console.log('promotion connections..................' + promotions);
    }
  });
};

/**
 * Promotion middleware
 */
exports.promotionByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Promotion is invalid'
    });
  }

  Promotion.findById(id).populate('user', 'displayName').exec(function (err, promotion) {
    if (err) {
      return next(err);
    } else if (!promotion) {
      return res.status(404).send({
        message: 'No Promotion with that identifier has been found'
      });
    }
    req.promotion = promotion;
    next();
  });
};


exports.shopPromotionByID = function (req, res, next, shopPomotionId) {

  Promotion.find({ shop_id: { _id: shopPomotionId } }).populate('user', 'displayName').exec(function (err, promotion) {
    if (err) {
      return next(err);
    } else if (!promotion) {
      return res.status(404).send({
        message: 'No Product with that identifier has been found'
      });
    }
    //console.log('connect to shopPromotion..............1' + promotion);
    req.shopPromotion = promotion;
    //console.log('connect to shopPromotion..............2' + req.shopPromotion);
    next();
  });
};

exports.promotionByShopIDResult = function (req, res) {
  res.jsonp(req.shopPromotion);
  // console.log('connect to shopPromotion..............3' + JSON.stringify(req.shopPromotion));
};