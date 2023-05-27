const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// Get all users
router.get('/', usersController.index);

// Get a specific user
router.get('/:id', usersController.show);

// Create a new user
router.post('/', usersController.create);

// Update user
router.put('/:id', usersController.update);

// Delete user
router.delete('/:id', usersController.destroy);


//export the router
module.exports = router;


