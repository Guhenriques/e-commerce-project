const client = require('../database/db');

const checkout = (req, res, next) => {
  const cartId = parseInt(req.params.cartId);

  // Validate the cart
  client.query('SELECT * FROM cart WHERE id = $1', [cartId], (error, results) => {
    if (error) {
      next(error);
    } else {
      if (results.rows.length === 0) {
        res.status(404).json({ error: 'Cart not found' });
      } else {
        // Process the payment (assume success for now)
        const paymentDetails = req.body.paymentDetails; // Assuming payment details are submitted in the request body
        // Implement payment processing logic here

        // Create an order
        const { user_id, product_id } = results.rows[0];

        client.query(
          'INSERT INTO orders (user_id, product_id, cart_id) VALUES ($1, $2, $3) RETURNING id',
          [user_id, product_id, cartId],
          (error, results) => {
            if (error) {
              next(error);
            } else {
              const orderId = results.rows[0].id;
              res.status(200).json({ message: 'Checkout successful', orderId });
            }
          }
        );
      }
    }
  });
};

module.exports = {
  checkout,
};
