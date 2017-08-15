'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Product = mongoose.model('Product'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Product
 */
exports.create = function (req, res) {
  var product = new Product(req.body);
  product.user = req.user;

  product.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(product);
    }
  });
};

/**
 * Show the current Product
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var product = req.product ? req.product.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  product.isCurrentUserOwner = req.user && product.user && product.user._id.toString() === req.user._id.toString();

  res.jsonp(product);
};

/**
 * Update a Product
 */
exports.update = function (req, res) {
  var product = req.product;

  product = _.extend(product, req.body);

  product.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(product);
    }
  });
};

/**
 * Delete an Product
 */
exports.delete = function (req, res) {
  var product = req.product;

  product.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(product);
    }
  });
};

/**
 * List of Products
 */
exports.list = function (req, res, next) {
  var usershop_id = req.user ? req.user.shop_id : '';
  var filter = '';
  if (usershop_id && usershop_id !== '') {
    filter = { shop_id: { _id: usershop_id } };
  }
  //console.log('product' + req.products);
  Product.find(filter).sort('-created').populate('user', 'displayName').populate('shop_id').exec(function (err, products) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      if (products && products.length > 0) {
        res.jsonp(products);
        // console.log('product' + products);
        // products.find({ shop_id: _id }).populate('shop_id').exec(function (productss) {
        //   console.log('testttttttttttttt>>>>>>>>>' + productss);
        // });
        //console.log(products.find({ shop_id: id }));
      } else {
        res.jsonp([]);
      }
    }
  });
};

/**
 * Product middleware
 */
exports.productByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Product is invalid'
    });
  }

  Product.findById(id).populate('user', 'displayName').populate('shop_id').exec(function (err, product) {
    if (err) {
      return next(err);
    } else if (!product) {
      return res.status(404).send({
        message: 'No Product with that identifier has been found'
      });
    }
    req.product = product;
    next();
  });
};

// exports.readproducts = function (req, res, next) {
//   Product.find().sort('-created').populate('user', 'displayName').populate('shop_id').exec(function (err, products) {
//     if (err) {
//       return res.status(400).send({
//         message: errorHandler.getErrorMessage(err)
//       });
//     } else {
//       if (products.length > 0) {
//         req.products = products;
//         next();
//       } else {
//         res.jsonp(products);
//       }
//     }
//   });
// };

exports.cookingreportproducts = function (req, res, next) {
  var cookingproducts = req.products;
  var productspush = [];
  var data = [];

  cookingproducts.forEach(function (product) {
    product.category.forEach(function (category) {
      product.image.forEach(function (image) {
        productspush.push({

          category_name: category.name,
          category_detail: category.detail,
          subcate: category.subcate,

          shop_name: product.shop_id.name,
          shop_email: product.shop_id.email,
          shop_phone: product.shop_id.phone,
          shop_shopid: product.shop_id.shopid,
          shop_address_address: product.shop_id.address.address,
          shop_address_distict: product.shop_id.address.distict,
          shop_address_province: product.shop_id.address.province,
          shop_address_postcode: product.shop_id.address.postcode,

          image_id: image.id,
          image_url: image.url,

          price: product.price,
          name: product.name,

        });
        // console.log('productspush----------data>>>>>>>>>>>>' + JSON.stringify(productspush));
      });
    });

    data.push(productspush);

  });
  req.productcomplete = data;

  next();
};

exports.reportproducts = function (req, res) {
  res.jsonp(req.productcomplete);
};







exports.productByShopID = function (req, res, next, shopProductId) {

  Product.find({ shop_id: { _id: shopProductId } }).populate('user', 'displayName').populate('shop_id').exec(function (err, product) {
    if (err) {
      return next(err);
    } else if (!product) {
      return res.status(404).send({
        message: 'No Product with that identifier has been found'
      });
    }
    req.shopProducts = product;
    next();
  });
};

exports.productByShopIDResult = function (req, res) {
  res.jsonp(req.shopProducts);
  console.log('connect to product..............' + req.shopProducts);
};