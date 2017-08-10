'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Shop = mongoose.model('Shop');

/**
 * Globals
 */
var user,
  shop;

/**
 * Unit tests
 */
describe('Shop Model Unit Tests:', function () {
  beforeEach(function (done) {
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: 'username',
      password: 'password'
    });

    user.save(function () {
      shop = new Shop({
        name: 'Shop Name',
        // address: '6/636',
        phone: '0923154235',
        email: 'coffeehub@hotmail.com',
        shopid: '456465FGF',
        address: [{
          address: '6/636',
          distict: 'เมยวดี',
          province: 'BKK',
          postcode: '10220',
        }],
        user: user
      });

      done();
    });
  });

  describe('Method Save', function () {
    it('should be able to save without problems', function (done) {
      this.timeout(0);
      return shop.save(function (err) {
        should.not.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without name', function (done) {
      shop.name = '';

      return shop.save(function (err) {
        should.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without address', function (done) {
      shop.address = null;

      return shop.save(function (err) {
        should.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without shopid', function (done) {
      shop.shopid = '';

      return shop.save(function (err) {
        should.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without phone', function (done) {
      shop.phone = '';

      return shop.save(function (err) {
        should.exist(err);
        done();
      });
    });
    it('should be able to show an error when try to save without email', function (done) {
      shop.email = '';

      return shop.save(function (err) {
        should.exist(err);
        done();
      });
    });

  });



  afterEach(function (done) {
    Shop.remove().exec(function () {
      User.remove().exec(function () {
        done();
      });
    });
  });
});
