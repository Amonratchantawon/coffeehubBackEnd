'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Shop_id = mongoose.model('Shop'),
  Product = mongoose.model('Product'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  shop,
  user,
  product;

/**
 * Product routes tests
 */
describe('Product CRUD tests', function () {

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

    // Create a new user
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

    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local',
      shop_id: shop
    });


    // Save a user to the test db and create new Product
    user.save(function () {
      shop.save(function () {
        product = {
          name: 'Product name',
          image: [{ id: 'IMG4', url: 'https://scontent.fbkk6-2.fna.fbcdn.net/v/t31.0-8/19702817_1363515100392787_1785671802800667021_o.jpg?oh=ee80568884d9815ad688556006142320&oe=5A3997D7' }],
          price: 400,
          shop_id: shop,
          category: [{
            name: 'drink',
            detail: 'xxxxxxxxxxxxxxxxxxxxxxx',
            subcate: 'coffee'
          }]
        };
        done();
      });

    });
  });

  it('should be able to save a Product if logged in', function (done) {
    var newproduct = new Product(product);
    var newshop = new Shop_id({
      name: 'Shop nameasdfsadasdf',
      address: [{
        address: '6/636adsfsadf',
        distict: 'เมยsadfsวดี',
        province: 'BKsadffdsK',
        postcode: '102asdfadfs20',
      }],
      phone: '0923154asdfdf235',
      email: 'coffeehufdsafsadb@hotmail.com',
      shopid: '456465dasfsfdFGF'
    });
    newproduct.shop_id = newshop;
    newproduct.save();
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

        // Save a new Product
        agent.post('/api/products')
          .send(product)
          .expect(200)
          .end(function (productSaveErr, productSaveRes) {
            // Handle Product save error
            if (productSaveErr) {
              return done(productSaveErr);
            }

            // Get a list of Products
            agent.get('/api/products')
              .end(function (productsGetErr, productsGetRes) {
                // Handle Products save error
                if (productsGetErr) {
                  return done(productsGetErr);
                }

                // Get Products list
                var products = productsGetRes.body;
                // console.log('product......>>>>>>>>'+ products);
                // console.log('product......>>>>>>>>' + JSON.stringify(products));
                // Set assertions
                (products.length).should.equal(1);
                (products[0].name).should.match('Product name');
                (products[0].shop_id.name).should.match('Shop name');

                // (products[0].name).should.match(name);
                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Product if not logged in', function (done) {
    agent.post('/api/products')
      .send(product)
      .expect(403)
      .end(function (productSaveErr, productSaveRes) {
        // Call the assertion callback
        done(productSaveErr);
      });
  });

  it('should not be able to save an Product if no name is provided', function (done) {
    // Invalidate name field
    product.name = '';

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

        // Save a new Product
        agent.post('/api/products')
          .send(product)
          .expect(400)
          .end(function (productSaveErr, productSaveRes) {
            // Set message assertion
            (productSaveRes.body.message).should.match('Please fill Product name');

            // Handle Product save error
            done(productSaveErr);
          });
      });
  });

  it('should be able to update an Product if signed in', function (done) {
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

        // Save a new Product
        agent.post('/api/products')
          .send(product)
          .expect(200)
          .end(function (productSaveErr, productSaveRes) {
            // Handle Product save error
            if (productSaveErr) {
              return done(productSaveErr);
            }

            // Update Product name
            product.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Product
            agent.put('/api/products/' + productSaveRes.body._id)
              .send(product)
              .expect(200)
              .end(function (productUpdateErr, productUpdateRes) {
                // Handle Product update error
                if (productUpdateErr) {
                  return done(productUpdateErr);
                }

                // Set assertions
                (productUpdateRes.body._id).should.equal(productSaveRes.body._id);
                (productUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Products if not signed in', function (done) {
    // Create new Product model instance
    var productObj = new Product(product);

    // Save the product
    productObj.save(function () {
      // Request Products
      request(app).get('/api/products')
        .end(function (req, res) {
          // Set assertion
          // res.body.should.equal(0);
          (res.body.length).should.equal(1);
          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Product if not signed in', function (done) {
    // Create new Product model instance
    var productObj = new Product(product);

    // Save the Product
    productObj.save(function () {
      request(app).get('/api/products/' + productObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', product.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Product with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/products/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Product is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Product which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Product
    request(app).get('/api/products/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Product with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Product if signed in', function (done) {
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

        // Save a new Product
        agent.post('/api/products')
          .send(product)
          .expect(200)
          .end(function (productSaveErr, productSaveRes) {
            // Handle Product save error
            if (productSaveErr) {
              return done(productSaveErr);
            }

            // Delete an existing Product
            agent.delete('/api/products/' + productSaveRes.body._id)
              .send(product)
              .expect(200)
              .end(function (productDeleteErr, productDeleteRes) {
                // Handle product error error
                if (productDeleteErr) {
                  return done(productDeleteErr);
                }

                // Set assertions
                (productDeleteRes.body._id).should.equal(productSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Product if not signed in', function (done) {
    // Set Product user
    product.user = user;

    // Create new Product model instance
    var productObj = new Product(product);

    // Save the Product
    productObj.save(function () {
      // Try deleting Product
      request(app).delete('/api/products/' + productObj._id)
        .expect(403)
        .end(function (productDeleteErr, productDeleteRes) {
          // Set message assertion
          (productDeleteRes.body.message).should.match('User is not authorized');

          // Handle Product error error
          done(productDeleteErr);
        });

    });
  });

  it('should be able to get a single Product that has an orphaned user reference', function (done) {
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

          // Save a new Product
          agent.post('/api/products')
            .send(product)
            .expect(200)
            .end(function (productSaveErr, productSaveRes) {
              // Handle Product save error
              if (productSaveErr) {
                return done(productSaveErr);
              }

              // Set assertions on new Product
              (productSaveRes.body.name).should.equal(product.name);
              should.exist(productSaveRes.body.user);
              should.equal(productSaveRes.body.user._id, orphanId);

              // force the Product to have an orphaned user reference
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

                    // Get the Product
                    agent.get('/api/products/' + productSaveRes.body._id)
                      .expect(200)
                      .end(function (productInfoErr, productInfoRes) {
                        // Handle Product error
                        if (productInfoErr) {
                          return done(productInfoErr);
                        }

                        // Set assertions
                        (productInfoRes.body._id).should.equal(productSaveRes.body._id);
                        (productInfoRes.body.name).should.equal(product.name);
                        should.equal(productInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  it('should not be able to save an Product if no image is provided', function (done) {
    // Invalidate name field
    product.image = null;
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

        // Save a new Product
        agent.post('/api/products')
          .send(product)
          .expect(400)
          .end(function (productSaveErr, productSaveRes) {
            // Set message assertion
            (productSaveRes.body.message).should.match('Please fill Product image');

            // Handle Product save error
            done(productSaveErr);
          });
      });
  });

  it('should not be able to save an Product if no price is provided', function (done) {
    // Invalidate name field
    product.price = '';
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

        // Save a new Product
        agent.post('/api/products')
          .send(product)
          .expect(400)
          .end(function (productSaveErr, productSaveRes) {
            // Set message assertion
            (productSaveRes.body.message).should.match('Please fill Product price');

            // Handle Product save error
            done(productSaveErr);
          });
      });
  });

  it('should not be able to save an Product if no category is provided', function (done) {
    // Invalidate name field
    product.category = null;
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

        // Save a new Product
        agent.post('/api/products')
          .send(product)
          .expect(400)
          .end(function (productSaveErr, productSaveRes) {
            // Set message assertion
            (productSaveRes.body.message).should.match('Please fill Product category');

            // Handle Product save error
            done(productSaveErr);
          });
      });
  });


  it('middleware read products By ShopID+++++++', function (done) {
    var p1 = new Product({
      name: 'Product name',
      image: [{ id: 'IMG4', url: 'https://scontent.fbkk6-2.fna.fbcdn.net/v/t31.0-8/19702817_1363515100392787_1785671802800667021_o.jpg?oh=ee80568884d9815ad688556006142320&oe=5A3997D7' }],
      price: 400,
      shop_id: shop,
      category: [{
        name: 'drink',
        detail: 'xxxxxxxxxxxxxxxxxxxxxxx',
        subcate: 'coffee'
      }]
    });

    var p2 = new Product({
      name: 'Product name2',
      image: [{ id: 'IMG4', url: 'https://scontent.fbkk6-2.fna.fbcdn.net/v/t31.0-8/19702817_1363515100392787_1785671802800667021_o.jpg?oh=ee80568884d9815ad688556006142320&oe=5A3997D7' }],
      price: 4002,
      shop_id: shop,
      category: [{
        name: 'drink2',
        detail: 'xxxxxxxx2xxxxxxxxxxxxxxx',
        subcate: 'coffee2'
      }]
    });

    p1.save();
    p2.save(function () {
      agent.get('/api/getproducts/' + shop._id)
        .end(function (productsGetErr, productsGetRes) {
          // Handle Aps save error
          if (productsGetErr) {
            return done(productsGetErr);
          }

          // Get Aps list
          var products = productsGetRes.body;
          console.log('rout.test>>>>>>>>>>>>>>>>>>>>>>>>' + product);
          // Set assertions
          (products.length).should.match(2);

          // (products[0].name).should.equal(name);



          // Call the assertion callback
          done();
        });
    });

  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Shop_id.remove().exec(function () {
        Product.remove().exec(done);
      });
    });
  });
});
