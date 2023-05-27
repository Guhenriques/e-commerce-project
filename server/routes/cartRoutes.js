const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Get the cart items for a specific user
router.get('/:userId', cartController.index);

// Get a specific cart item by ID
router.get('/item/:id', cartController.show);

// Create a new cart item
router.post('/', cartController.create);

// Update a specific cart item
router.put('/:id', cartController.update);

// Delete a specific cart item
router.delete('/:id', cartController.destroy);

module.exports = router;