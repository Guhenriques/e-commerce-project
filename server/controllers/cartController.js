const client = require('../database/db');

const index = (req, res, next) => {
  const userId = parseInt(req.params.userId);

  client.query('SELECT * FROM cart WHERE user_id = $1', [userId], (error, results) => {
    if (error) {
      next(error);
    } else {
      res.status(200).json(results.rows);
    }
  });
};

const show = (req, res, next) => {
  const id = parseInt(req.params.id);

  client.query('SELECT * FROM cart WHERE id = $1', [id], (error, results) => {
    if (error) {
      next(error);
    } else {
      if (results.rows.length === 0) {
        res.status(404).json({ error: 'Cart item not found' });
      } else {
        res.status(200).json(results.rows[0]);
      }
    }
  });
};

const create = (req, res, next) => {
  const { user_id, product_id, cart_id, total_price } = req.body;

  client.query(
    'INSERT INTO orders (user_id, product_id, cart_id, total_price) VALUES ($1, $2, $3, $4) RETURNING id',
    [user_id, product_id, cart_id, total_price],
    (error, results) => {
      if (error) {
        next(error);
      } else {
        const orderId = results.rows[0].id;
        res.status(201).json({ id: orderId });
      }
    }
  );
};

const update = (req, res, next) => {
  const id = parseInt(req.params.id);
  const { product_id } = req.body;

  client.query(
    'UPDATE cart SET product_id = $1 WHERE id = $2',
    [product_id, id],
    (error, results) => {
      if (error) {
        next(error);
      } else {
        if (results.rowCount === 0) {
          res.status(404).json({ error: 'Cart item not found' });
        } else {
          res.status(200).json({ message: `Cart item modified with ID: ${id}` });
        }
      }
    }
  );
};


const destroy = (req, res, next) => {
  const id = parseInt(req.params.id);
  // check if the value parsed is a integer or not
  if (isNaN(id)) {
    res.status(400).json({ error: 'Invalid ID' });
    return;
  }

  client.query('DELETE FROM cart WHERE id = $1', [id], (error, results) => {
    if (error) {
      next(error);
    } else if (results.rowCount === 0) {
      res.status(404).json({ error: 'Cart item not found' });
    } else {
      res.status(200).json({ message: `Cart item deleted with ID: ${id}` });
    }
  });
};

module.exports = {
  index,
  show,
  create,
  update,
  destroy,
};
