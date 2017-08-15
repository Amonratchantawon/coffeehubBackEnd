'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Shop_id = mongoose.model('Shop'),
  Product = mongoose.model('Product');

/**
 * Globals
 */
var user,
  shop,
  product;

/**
 * Unit tests
 */
describe('Product Model Unit Tests:', function () {
  beforeEach(function (done) {
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: 'username',
      password: 'password'
    });

    shop = new Shop_id({
      name: 'Shop name',
      address: [{
        address: '6/636',
        distict: 'เมยวดี',
        province: 'BKK',
        postcode: '10220',
      }],
      phone: '0923154235',
      email: 'coffeehub@hotmail.com',
      shopid: '456465FGF'
    });

    user.save(function () {
      shop.save(function () {
        product = new Product({
          name: 'Product Name',
          image: [{ id: 'IMG4', url: 'https://scontent.fbkk6-2.fna.fbcdn.net/v/t31.0-8/19702817_1363515100392787_1785671802800667021_o.jpg?oh=ee80568884d9815ad688556006142320&oe=5A3997D7' }],
          price: 400,
          user: user,
          shop_id: shop,
          category: [{
            name: 'drink',
            detail: 'xxxxxxxxxxxxxxxxxxxxxxx',
            subcate: 'coffee'
          }],
        });

        done();
      });

    });
  });

  describe('Method Save', function () {
    it('should be able to save without problems', function (done) {
      this.timeout(0);
      return product.save(function (err) {
        should.not.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without name', function (done) {
      product.name = '';

      return product.save(function (err) {
        should.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without image', function (done) {
      product.image = [];

      return product.save(function (err) {
        should.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without price', function (done) {
      product.price = null;

      return product.save(function (err) {
        should.exist(err);
        done();
      });
    });

    // it('should be able to show an error when try to save without shop_id', function (done) {
    //   product.shop_id = null;

    //   return product.save(function (err) {
    //     should.exist(err);
    //     done();
    //   });
    // });

  });

  afterEach(function (done) {
    Product.remove().exec(function () {
      User.remove().exec(function () {
        Shop_id.remove().exec(function () {
          done();
        });
      });
    });
  });
});