const express = require('express')
const app = express()
const port = 3000

const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const usersRoutes = require('./server/routes/usersRoutes');
const productsRoutes = require('./server/routes/productsRoutes');
const cartRoutes = require('./server/routes/cartRoutes');
const ordersRoutes = require('./server/routes/ordersRoutes');
const checkoutRoutes = require('./server/routes/checkoutRoutes');
const loginRouter = require('./server/routes/authRoute');

const passport = require('passport');
const session = require('express-session');

app.use(session({
  secret: 'secretrestapi',
  resave: false,
  saveUninitialized: false
}));

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
