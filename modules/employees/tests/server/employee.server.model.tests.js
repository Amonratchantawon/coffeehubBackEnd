'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Shop_id = mongoose.model('Shop'),
  Employee = mongoose.model('Employee');

/**
 * Globals
 */
var user,
  shop,
  employee;




/**
 * Unit tests
 */
describe('Employee Model Unit Tests:', function () {
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
        employee = new Employee({
          //name: 'Employee Name',
          empid: 'A123',
          firsname: 'amonrat',
          lastname: 'chantawon',
          jobposition: 'serve',
          phone: '0930241530',
          email: 'amonrat@hotmail.com',
          shop_id: shop,
          user: user
        });

        done();
      });

    });
  });

  describe('Method Save', function () {
    it('should be able to save without problems', function (done) {
      this.timeout(0);
      return employee.save(function (err) {
        should.not.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without empid', function (done) {
      employee.empid = '';

      return employee.save(function (err) {
        should.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without firsname', function (done) {
      employee.firsname = '';

      return employee.save(function (err) {
        should.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without lastname', function (done) {
      employee.lastname = '';

      return employee.save(function (err) {
        should.exist(err);
        done();
      });
    });

    // it('should be able to show an error when try to save without role', function (done) {
    //   employee.role = '';

    //   return employee.save(function (err) {
    //     should.exist(err);
    //     done();
    //   });
    // });

    it('should be able to show an error when try to save without jobposition', function (done) {
      employee.jobposition = '';

      return employee.save(function (err) {
        should.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without phone', function (done) {
      employee.phone = '';

      return employee.save(function (err) {
        should.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without email', function (done) {
      employee.email = '';

      return employee.save(function (err) {
        should.exist(err);
        done();
      });
    });

    // it('should be able to show an error when try to save without username', function (done) {
    //   employee.username = '';

    //   return employee.save(function (err) {
    //     should.exist(err);
    //     done();
    //   });
    // });

    // it('should be able to show an error when try to save without password', function (done) {
    //   employee.password = '';

    //   return employee.save(function (err) {
    //     should.exist(err);
    //     done();
    //   });
    // });


  });



  afterEach(function (done) {
    Employee.remove().exec(function () {
      User.remove().exec(function () {
        Shop_id.remove().exec(function () {
          done();
        });
      });
    });
  });
});
