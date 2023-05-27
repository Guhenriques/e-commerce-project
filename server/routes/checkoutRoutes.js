const express = require('express');
const router = express.Router();
const checkoutController = require('../controllers/checkoutController');

// Checkout endpoint
router.post('/:cartId/checkout', checkoutController.checkout);

module.exports = router;