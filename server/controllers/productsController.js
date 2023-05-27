const client = require('../database/db');

const index = (req, res, next) => {
  client.query('SELECT * FROM products ORDER BY id ASC', (error, results) => {
    if (error) {
      next(error);
    } else {
      res.type('application/json');
      res.status(200).send(JSON.stringify(results.rows, null, 2));
    }
  });
};

const show = (req, res, next) => {
  const id = parseInt(req.params.id);

  client.query('SELECT * FROM products WHERE id = $1', [id], (error, results) => {
    if (error) {
      next(error);
    } else {
      if (results.rows.length === 0) {
        res.status(404).json({ error: 'Product not found' });
      } else {
        res.status(200).json(results.rows[0]);
      }
    }
  });
};

const create = (req, res, next) => {
  const { name, category, quantity, price } = req.body;

  client.query(
    'SELECT * FROM products WHERE name = $1',
    [name],
    (error, results) => {
      if (error) {
        next(error);
      } else {
        if (results.rows.length > 0) {
          // Product with the same name already exists
          const errorMessage = 'Product already exists';
          res.status(400).json({ error: errorMessage });
        } else {
          // Insert the new product
          client.query(
            'INSERT INTO products (name, category, quantity, price) VALUES ($1, $2, $3, $4) RETURNING id',
            [name, category, quantity, price],
            (error, results) => {
              if (error) {
                next(error);
              } else {
                res.status(201).json({ message: 'Product created successfully', id: results.rows[0].id });
              }
            }
          );
        }
      }
    }
  );
};


const update = (req, res, next) => {
  const id = parseInt(req.params.id);
  const { name, category, quantity, price } = req.body;

  client.query(
    'UPDATE products SET name = $1, category = $2, quantity = $3, price = $4 WHERE id = $5',
    [name, category, quantity, price, id],
    (error, results) => {
      if (error) {
        next(error);
      } else {
        if (results.rowCount === 0) {
          res.status(404).json({ error: 'Product not found' });
        } else {
          res.status(200).json({ message: `Product modified with ID: ${id}` });
        }
      }
    }
  );
};

const destroy = (req, res, next) => {
  const id = parseInt(req.params.id);

  client.query('DELETE FROM products WHERE id = $1', [id], (error, results) => {
    if (error) {
      next(error);
    } else if (results.rowCount === 0) {
      res.status(404).json({ error: 'Product not found' });
    } else {
      res.status(200).json({ message: `Product deleted with ID: ${id}` });
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
