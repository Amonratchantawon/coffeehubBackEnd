'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Shop_id = mongoose.model('Shop'),
  Employee = mongoose.model('Employee'),
  Order = mongoose.model('Order');

/**
 * Globals
 */
var user,
  shop,
  employee,
  order;



/**
 * Unit tests
 */
describe('Order Model Unit Tests:', function () {
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

    employee = new Employee({
      empid: 'A123',
      firsname: 'amonrat',
      lastname: 'chantawon',
      jobposition: 'serve',
      phone: '0930241530',
      email: 'amonrat@hotmail.com',
      shop_id: shop,
      user: user
    });

    user.save(function () {
      shop.save(function () {
        employee.save(function () {
          order = new Order({
            //name: 'Order Name',
            items: [{
              product_id: 'coffee',
              amount: 45,
              qty: 2
            }],
            date: new Date(),
            receiptNo: 'A78925546',
            change: 65,
            cash: 100,
            netamount: 45,
            shop_id: shop,
            user: user,
            emp_id: employee
          });
          done();
        });
      });
    });
  });

  describe('Method Save', function () {
    it('should be able to save without problems', function (done) {
      this.timeout(0);
      return order.save(function (err) {
        should.not.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without items', function (done) {
      order.items = [];

      return order.save(function (err) {
        should.exist(err);
        done();
      });
    });
  });

  afterEach(function (done) {
    Order.remove().exec(function () {
      User.remove().exec(function () {
        Shop_id.remove().exec(function () {
          Employee.remove().exec(function () {
            done();
          });
        });
      });
    });
  });
});
