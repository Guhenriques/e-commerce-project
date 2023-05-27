const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const client = require('../database/db');

passport.use(new LocalStrategy(
  { usernameField: 'email' }, // Assuming 'email' is the field for email in the request
  function verify(email, password, done) {
    db.query('SELECT * FROM users WHERE email = $1', [email], function (err, result) {
      if (err) { return done(err); }
      const user = result.rows[0]; // Assuming the result returns a single user

      if (!user) {
        return done(null, false, { message: 'Incorrect email or password.' });
      }

      bcrypt.compare(password, user.password, function (err, res) {
        if (err) { return done(err); }
        if (!res) {
          return done(null, false, { message: 'Incorrect email or password.' });
        }
        return done(null, user);
      });
    });
  }
));

// Serialize user
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// Deserialize user
passport.deserializeUser(function (id, done) {
  db.get('SELECT * FROM users WHERE id = $1', [id], function (err, user) {
    done(err, user);
  });
});

module.exports = passport;