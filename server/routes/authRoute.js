const express = require('express');
const passport = require('../configs/passport');
const router = express.Router();

// Handle user login
router.post('/', passport.authenticate('local'), (req, res) => {
  // Authentication succeeded, handle the response
  res.json({ message: 'Login successful' });
});


module.exports = router;

