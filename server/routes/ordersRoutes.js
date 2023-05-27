const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController');

// Get all orders
router.get('/', ordersController.getOrderHistory);

// Get a specific order by ID
router.get('/:orderId', ordersController.getOrderDetails);

// Create a new order
router.post('/', ordersController.createOrder);

// Update an existing order
router.put('/:orderId', ordersController.updateOrder);

// Delete an order
router.delete('/:orderId', ordersController.deleteOrder);

module.exports = router;
