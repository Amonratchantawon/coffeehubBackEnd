'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Shop_id = mongoose.model('Shop'),
  Employee = mongoose.model('Employee'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  shop,
  employee;



/**
 * Employee routes tests
 */
describe('Employee CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

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

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new Employee
    user.save(function () {
      shop.save(function () {
        employee = {
          empid: 'A123',
          firsname: 'amonrat',
          lastname: 'chantawon',
          jobposition: 'serve',
          phone: '0930241530',
          email: 'amonrat@hotmail.com',
          shop_id: shop
        };

        done();
      });

    });
  });

  it('should be able to save a Employee if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Employee
        agent.post('/api/employees')
          .send(employee)
          .expect(200)
          .end(function (employeeSaveErr, employeeSaveRes) {
            // Handle Employee save error
            if (employeeSaveErr) {
              return done(employeeSaveErr);
            }

            // Get a list of Employees
            agent.get('/api/employees')
              .end(function (employeesGetErr, employeesGetRes) {
                // Handle Employees save error
                if (employeesGetErr) {
                  return done(employeesGetErr);
                }

                // Get Employees list
                var employees = employeesGetRes.body;

                // Set assertions
                (employees[0].user._id).should.equal(userId);
                (employees[0].empid).should.match('A123');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Employee if not logged in', function (done) {
    agent.post('/api/employees')
      .send(employee)
      .expect(403)
      .end(function (employeeSaveErr, employeeSaveRes) {
        // Call the assertion callback
        done(employeeSaveErr);
      });
  });

  it('should not be able to save an Employee if no empid is provided', function (done) {
    // Invalidate name field
    employee.empid = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Employee
        agent.post('/api/employees')
          .send(employee)
          .expect(400)
          .end(function (employeeSaveErr, employeeSaveRes) {
            // Set message assertion
            (employeeSaveRes.body.message).should.match('Please fill Employee empid');

            // Handle Employee save error
            done(employeeSaveErr);
          });
      });
  });

  it('should not be able to save an Employee if no firsname is provided', function (done) {
    // Invalidate name field
    employee.firsname = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Employee
        agent.post('/api/employees')
          .send(employee)
          .expect(400)
          .end(function (employeeSaveErr, employeeSaveRes) {
            // Set message assertion
            (employeeSaveRes.body.message).should.match('Please fill Employee firsname');

            // Handle Employee save error
            done(employeeSaveErr);
          });
      });
  });

  it('should not be able to save an Employee if no lastname is provided', function (done) {
    // Invalidate name field
    employee.lastname = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Employee
        agent.post('/api/employees')
          .send(employee)
          .expect(400)
          .end(function (employeeSaveErr, employeeSaveRes) {
            // Set message assertion
            (employeeSaveRes.body.message).should.match('Please fill Employee lastname');

            // Handle Employee save error
            done(employeeSaveErr);
          });
      });
  });

  it('should not be able to save an Employee if no jobposition is provided', function (done) {
    // Invalidate name field
    employee.jobposition = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Employee
        agent.post('/api/employees')
          .send(employee)
          .expect(400)
          .end(function (employeeSaveErr, employeeSaveRes) {
            // Set message assertion
            (employeeSaveRes.body.message).should.match('Please fill Employee jobposition');

            // Handle Employee save error
            done(employeeSaveErr);
          });
      });
  });

  it('should not be able to save an Employee if no phone is provided', function (done) {
    // Invalidate name field
    employee.phone = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Employee
        agent.post('/api/employees')
          .send(employee)
          .expect(400)
          .end(function (employeeSaveErr, employeeSaveRes) {
            // Set message assertion
            (employeeSaveRes.body.message).should.match('Please fill Employee phone');

            // Handle Employee save error
            done(employeeSaveErr);
          });
      });
  });

  it('should not be able to save an Employee if no email is provided', function (done) {
    // Invalidate name field
    employee.email = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Employee
        agent.post('/api/employees')
          .send(employee)
          .expect(400)
          .end(function (employeeSaveErr, employeeSaveRes) {
            // Set message assertion
            (employeeSaveRes.body.message).should.match('Please fill Employee email');

            // Handle Employee save error
            done(employeeSaveErr);
          });
      });
  });

  it('should be able to update an Employee if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Employee
        agent.post('/api/employees')
          .send(employee)
          .expect(200)
          .end(function (employeeSaveErr, employeeSaveRes) {
            // Handle Employee save error
            if (employeeSaveErr) {
              return done(employeeSaveErr);
            }

            // Update Employee name
            employee.empid = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Employee
            agent.put('/api/employees/' + employeeSaveRes.body._id)
              .send(employee)
              .expect(200)
              .end(function (employeeUpdateErr, employeeUpdateRes) {
                // Handle Employee update error
                if (employeeUpdateErr) {
                  return done(employeeUpdateErr);
                }

                // Set assertions
                (employeeUpdateRes.body._id).should.equal(employeeSaveRes.body._id);
                (employeeUpdateRes.body.empid).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Employees if not signed in', function (done) {
    // Create new Employee model instance
    var employeeObj = new Employee(employee);

    // Save the employee
    employeeObj.save(function () {
      // Request Employees
      request(app).get('/api/employees')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Employee if not signed in', function (done) {
    // Create new Employee model instance
    var employeeObj = new Employee(employee);

    // Save the Employee
    employeeObj.save(function () {
      request(app).get('/api/employees/' + employeeObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('empid', employee.empid);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Employee with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/employees/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Employee is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Employee which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Employee
    request(app).get('/api/employees/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Employee with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Employee if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Employee
        agent.post('/api/employees')
          .send(employee)
          .expect(200)
          .end(function (employeeSaveErr, employeeSaveRes) {
            // Handle Employee save error
            if (employeeSaveErr) {
              return done(employeeSaveErr);
            }

            // Delete an existing Employee
            agent.delete('/api/employees/' + employeeSaveRes.body._id)
              .send(employee)
              .expect(200)
              .end(function (employeeDeleteErr, employeeDeleteRes) {
                // Handle employee error error
                if (employeeDeleteErr) {
                  return done(employeeDeleteErr);
                }

                // Set assertions
                (employeeDeleteRes.body._id).should.equal(employeeSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Employee if not signed in', function (done) {
    // Set Employee user
    employee.user = user;

    // Create new Employee model instance
    var employeeObj = new Employee(employee);

    // Save the Employee
    employeeObj.save(function () {
      // Try deleting Employee
      request(app).delete('/api/employees/' + employeeObj._id)
        .expect(403)
        .end(function (employeeDeleteErr, employeeDeleteRes) {
          // Set message assertion
          (employeeDeleteRes.body.message).should.match('User is not authorized');

          // Handle Employee error error
          done(employeeDeleteErr);
        });

    });
  });

  it('should be able to get a single Employee that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new Employee
          agent.post('/api/employees')
            .send(employee)
            .expect(200)
            .end(function (employeeSaveErr, employeeSaveRes) {
              // Handle Employee save error
              if (employeeSaveErr) {
                return done(employeeSaveErr);
              }

              // Set assertions on new Employee
              (employeeSaveRes.body.empid).should.equal(employee.empid);
              should.exist(employeeSaveRes.body.user);
              should.equal(employeeSaveRes.body.user._id, orphanId);

              // force the Employee to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the Employee
                    agent.get('/api/employees/' + employeeSaveRes.body._id)
                      .expect(200)
                      .end(function (employeeInfoErr, employeeInfoRes) {
                        // Handle Employee error
                        if (employeeInfoErr) {
                          return done(employeeInfoErr);
                        }

                        // Set assertions
                        (employeeInfoRes.body._id).should.equal(employeeSaveRes.body._id);
                        (employeeInfoRes.body.empid).should.equal(employee.empid);
                        should.equal(employeeInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });


  it('middleware read employees', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        // var userId = user.id;

        // Save a new Ap
        agent.post('/api/employees')
          .send(employee)
          .expect(200)
          .end(function (employeeSaveErr, employeeSaveRes) {
            // Handle Ap save error
            if (employeeSaveErr) {
              return done(employeeSaveErr);
            }

            // Get a list of Aps
            agent.get('/api/reportemployees')
              .end(function (employeesGetErr, employeesGetRes) {
                // Handle Aps save error
                if (employeesGetErr) {
                  return done(employeesGetErr);
                }

                // Get Aps list
                var employees = employeesGetRes.body;

                // Set assertions
                // (aps[0].user._id).should.equal(userId);
                (employees.length).should.match(3);

                // (aps[0].debit[0].docdate).should.match(ap.docdate);
                // (aps[0].debit[0].docref).should.match(ap.docno);
                // (aps[0].debit[0].accname).should.match(ap.items[0].productname);
                // (aps[0].debit[0].amount).should.match(ap.items[0].amount);

                // (aps[0].credit[0].docdate).should.match(ap.docdate);
                // (aps[0].credit[0].docref).should.match(ap.docno);
                // (aps[0].credit[0].accname).should.match(ap.contact);
                // (aps[0].credit[0].amount).should.match(ap.amount);


                // (employees[0].empid).should.match(employee.empid);
                // (employees[0].firsname).should.match(employee.firsname);
                // (employees[0].lastname).should.match(employee.lastname);
                // (employees[0].jobposition).should.match(employee.jobposition);
                // (employees[0].phone).should.match(employee.phone);
                // (employees[0].email).should.match(employee.email);


                // Call the assertion callback
                done();
              });
          });
      });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Shop_id.remove().exec(function () {
        Employee.remove().exec(done);
      });
    });
  });
});
