const client = require('../database/db');
const bcrypt = require('bcrypt');

const index = (req, res, next) => {
  client.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      next(error); // Pass the error to the error handling middleware
    } else {
      res.type('application/json');
      res.status(200).send(JSON.stringify(results.rows, null, 2));
    }
  });
};

const show = (req, res, next) => {
  const id = parseInt(req.params.id);

  client.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      next(error); // Pass the error to the error handling middleware
    } else {
      res.status(200).json(results.rows);
    }
  });
};

const create = async (req, res, next) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  client.query(
    'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id',
    [name, email, hashedPassword],
    (error, results) => {
      if (error) {
        next(error); // Pass the error to the error handling middleware
      } else {
        res.status(201).send(`User added with ID: ${results.rows[0].id}`);
      }
    }
  );
};

const update = async (req, res, next) => {
  const id = parseInt(req.params.id);
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  client.query(
    'UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4',
    [name, email, hashedPassword, id],
    (error, results) => {
      if (error) {
        next(error); // Pass the error to the error handling middleware
      } else {
        res.status(200).send(`User modified with ID: ${id}`);
      }
    }
  );
};

const destroy = (req, res, next) => {
  const id = parseInt(req.params.id);

  client.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      next(error); // Pass the error to the error handling middleware
    } else if (results.rowCount === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.status(200).json({ message: `User deleted with ID: ${id}` });
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
