const express = require('express');
const session = require('express-session');
const passport = require('passport');
const app = express();
const port = 8000;

const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const usersRoutes = require('./routes/usersRoutes');
const productsRoutes = require('./routes/productsRoutes');
const cartRoutes = require('./routes/cartRoutes');
const ordersRoutes = require('./routes/ordersRoutes');
const checkoutRoutes = require('./routes/checkoutRoutes');
const loginRouter = require('./routes/authRoute');

app.use(express.json());

// Configure session middleware
app.use(
  session({
    secret: 'secretrestapi',
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Configure session serialization and deserialization
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  client.query('SELECT * FROM users WHERE id = $1', [id], function (err, result) {
    if (err) {
      return done(err);
    }
    if (result.rows.length === 0) {
      return done(new Error('User not found'));
    }
    const user = result.rows[0]; // Assuming the result returns a single user
    done(null, user);
  });
});

// Enable CORS middleware
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Set the allowed origin
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Set the allowed HTTP methods
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Set the allowed headers
  res.setHeader('Access-Control-Allow-Credentials', 'true'); // Set to allow credentials (e.g., cookies)
  next();
});

// Route handlers and middlewares
app.use('/users', usersRoutes);
app.use('/products', productsRoutes);
app.use('/cart', cartRoutes);
app.use('/orders', ordersRoutes);
app.use('/checkout', checkoutRoutes);
app.use('/users/login', loginRouter);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.get('/', (request, response) => {
  response.json({ info: 'This is my E-commerce Rest API!' });
});

// Start the server
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
