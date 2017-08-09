'use strict';

/**
 * Module dependencies
 */
var ordersPolicy = require('../policies/orders.server.policy'),
  orders = require('../controllers/orders.server.controller');

module.exports = function (app) {
  // Orders Routes
  app.route('/api/orders').all(ordersPolicy.isAllowed)
    .get(orders.list)
    .post(orders.create);

  app.route('/api/orders/:orderId').all(ordersPolicy.isAllowed)
    .get(orders.read)
    .put(orders.update)
    .delete(orders.delete);

  app.route('/api/reportorders').all(ordersPolicy.isAllowed)
    .get(orders.readorders, orders.cookingreportorders, orders.reportorders);

  // Finish by binding the Order middleware
  app.param('orderId', orders.orderByID);
};
