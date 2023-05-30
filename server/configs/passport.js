const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const client = require('../database/db');

passport.use(new LocalStrategy(
  { usernameField: 'email' },
  function verify(email, password, done) {
    client.query('SELECT * FROM users WHERE email = $1', [email], function (err, result) {
      if (err) { return done(err); }
      const user = result.rows[0];

      if (!user) {
        return done(null, false, { message: 'Incorrect email or password.' });
      }

      bcrypt.compare(password, user.password, function (err, res) {
        if (err) { return done(err); }
        if (!res) {
          return done(null, false, { message: 'Incorrect email or password.' });
        }

        // Assign the user ID to req.user
        const { id, ...userData } = user;
        return done(null, { id, ...userData });
      });
    });
  }
));


module.exports = passport;
