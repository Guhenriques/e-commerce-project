const express = require('express')
const app = express()
const port = 8000

const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const usersRoutes = require('./routes/usersRoutes');
const productsRoutes = require('./routes/productsRoutes');
const cartRoutes = require('./routes/cartRoutes');
const ordersRoutes = require('./routes/ordersRoutes');
const checkoutRoutes = require('./routes/checkoutRoutes');
const loginRouter = require('./routes/authRoute');

const passport = require('passport');
const session = require('express-session');

app.use(session({
  secret: 'secretrestapi',
  resave: false,
  saveUninitialized: false
}));

// Enable CORS middleware
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Set the allowed origin
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Set the allowed HTTP methods
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Set the allowed headers
  res.setHeader('Access-Control-Allow-Credentials', 'true'); // Set to allow credentials (e.g., cookies)
  next();
});

app.use(passport.initialize());

app.use(express.json());

app.use('/users', usersRoutes);
app.use('/products', productsRoutes);
app.use('/cart', cartRoutes);
app.use('/orders', ordersRoutes);
app.use('/checkout', checkoutRoutes);
app.use('/login', loginRouter);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.get('/', (request, response) => {
  response.json({ info: 'This is my E-commerce Rest API!' })
})

app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`),
);
