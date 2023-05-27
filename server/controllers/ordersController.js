const client = require('../database/db');

const getOrderHistory = (req, res, next) => {
  client.query('SELECT * FROM orders ORDER BY id DESC', (error, results) => {
    if (error) {
      next(error);
    } else {
      res.type('application/json');
      res.status(200).send(JSON.stringify(results.rows, null, 2));
    }
  });
};


const getOrderDetails = (req, res, next) => {
  const orderId = parseInt(req.params.orderId);

  client.query('SELECT * FROM orders WHERE id = $1', [orderId], (error, results) => {
    if (error) {
      next(error);
    } else {
      if (results.rows.length === 0) {
        res.status(404).json({ error: 'Order not found' });
      } else {
        res.status(200).json(results.rows[0]);
      }
    }
  });
};

const createOrder = (req, res, next) => {
  const { user_id, product_id, cart_id } = req.body;

  client.query(
    'INSERT INTO orders (user_id, product_id, cart_id) VALUES ($1, $2, $3) RETURNING id',
    [user_id, product_id, cart_id],
    (error, results) => {
      if (error) {
        next(error);
      } else {
        res.status(201).json({ id: results.rows[0].id });
      }
    }
  );
};

const updateOrder = (req, res, next) => {
  const orderId = parseInt(req.params.orderId);
  const { user_id, product_id, cart_id } = req.body;

  client.query(
    'UPDATE orders SET user_id = $1, product_id = $2, WHERE id = $3',
    [user_id, product_id, cart_id, orderId],
    (error, results) => {
      if (error) {
        next(error);
      } else {
        if (results.rowCount === 0) {
          res.status(404).json({ error: 'Order not found' });
        } else {
          res.status(200).json({ message: `Order modified with ID: ${orderId}` });
        }
      }
    }
  );
};

const deleteOrder = (req, res, next) => {
  const orderId = parseInt(req.params.orderId);

  client.query('DELETE FROM orders WHERE id = $1', [orderId], (error, results) => {
    if (error) {
      next(error);
    } else if (results.rowCount === 0) {
      res.status(404).json({ error: 'Order not found' });
    } else {
      res.status(200).json({ message: `Order deleted with ID: ${orderId}` });
    }
  });
};

module.exports = {
  getOrderHistory,
  getOrderDetails,
  createOrder,
  updateOrder,
  deleteOrder,
};
