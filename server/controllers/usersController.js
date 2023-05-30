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
  // Get the authenticated user ID from the session or token
  console.log('Response do req', req.id)

  // const userId = req.user.id;

  const id = parseInt(req.params.id);


  client.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      next(error); // Pass the error to the error handling middleware
    } else {
      res.status(200).json(results.rows);
    }
  });
};

const getCurrentUser = (req, res, next) => {
  // Assuming you have implemented authentication and stored the user object in req.user
  const currentUser = parseInt(req.params.id);

  // Check if user is authenticated
  if (!currentUser) {
    return res.status(401).json({ error: 'User not authenticated' });
  }

  client.query('SELECT * FROM users WHERE id = $1', [currentUser], (error, results) => {
    if (error) {
      next(error); // Pass the error to the error handling middleware
    } else {
      res.status(200).json(results.rows[0]);
    }
  });

  // Return the current user's data
  // return res.status(200).json(currentUser);
};

const create = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    // Check if user with the same email already exists
    const existingUser = await client.query('SELECT * FROM users WHERE email = $1', [email]);

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the user into the database, without specifying the ID
    const newUser = await client.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id',
      [name, email, hashedPassword]
    );

    res.status(201).json({ id: newUser.rows[0].id });
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
};

const update = async (req, res, next) => {
  const id = parseInt(req.params.id);
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  client.query(
    'UPDATE users SET email = $1, password = $2 WHERE id = $3',
    [email, hashedPassword, id],
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
  getCurrentUser
};
