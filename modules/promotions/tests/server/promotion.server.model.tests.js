'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Shop_id = mongoose.model('Shop'),
  Promotion = mongoose.model('Promotion');

/**
 * Globals
 */
var user,
  shop,
  promotion;

/**
 * Unit tests
 */
describe('Promotion Model Unit Tests:', function () {
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
        promotion = new Promotion({
          name: 'Promotion Name',
          code: 'A5468Yu',
          startdate: new Date('2017-08-10T18:20:14+07:00'),
          enddate: new Date('2018-08-10T18:20:14+07:00'),
          status: 'activate',
          detail: 'Open new shop discount 5%',
          discounttype: ['Percent'],
          value: 46,
          log: [{
            user: user,
            date: new Date()
          }],
          shop_id: shop
        });

        done();
      });
    });
  });

  describe('Method Save', function () {
    it('should be able to save without problems', function (done) {
      this.timeout(0);
      return promotion.save(function (err) {
        should.not.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without name', function (done) {
      promotion.name = '';

      return promotion.save(function (err) {
        should.exist(err);
        done();
      });
    });
    it('should be able to show an error when try to save without code', function (done) {
      promotion.code = '';

      return promotion.save(function (err) {
        should.exist(err);
        done();
      });
    });
    it('should be able to show an error when try to save without startdate', function (done) {
      promotion.startdate = '';

      return promotion.save(function (err) {
        should.exist(err);
        done();
      });
    });
    it('should be able to show an error when try to save without enddate', function (done) {
      promotion.enddate = null;

      return promotion.save(function (err) {
        should.exist(err);
        done();
      });
    });
    it('should be able to show an error when try to save without status', function (done) {
      promotion.status = null;

      return promotion.save(function (err) {
        should.exist(err);
        done();
      });
    });
    it('should be able to show an error when try to save without detail', function (done) {
      promotion.detail = '';

      return promotion.save(function (err) {
        should.exist(err);
        done();
      });
    });
    it('should be able to show an error when try to save without discounttype', function (done) {
      promotion.discounttype = '';

      return promotion.save(function (err) {
        should.exist(err);
        done();
      });
    });
  });



  afterEach(function (done) {
    Promotion.remove().exec(function () {
      User.remove().exec(function () {
        done();
      });
    });
  });
});
