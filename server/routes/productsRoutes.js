const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

// Get all products
router.get('/', productsController.index);

// Get a specific product 
router.get('/:id', productsController.show);

// Create new product
router.post('/', productsController.create);

// Update a specific product
router.put('/:id', productsController.update);

// Delete a product
router.delete('/:id', productsController.destroy);

//export the router
module.exports = router;