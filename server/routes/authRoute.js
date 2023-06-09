const express = require('express');
const passport = require('../configs/passport');
const router = express.Router();

// Handle user login
router.post('/', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ error: 'Incorrect email or password.' });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      console.log(req.user); // test

      console.log('(authRoute) User ID:', user.id); // test

      // Authentication succeeded, handle the response
      res.json({ message: 'Login successful', user });
    });
  })(req, res, next);
});

module.exports = router;