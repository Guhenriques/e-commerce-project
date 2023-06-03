import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        // Handle login error
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
  
      const { user } = await response.json();
  
      if (user) {
        localStorage.setItem('token', JSON.stringify(user));
      } else {
        console.log('Not receiving a user');
      }
  
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error.message);
      setError(error.message); // Set the error message to display to the user
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await handleLogin();
      // Login successful, handle success (e.g., redirect the user)
    } catch (error) {
      console.error('Login failed: ', error.message);
    }

    // Reset form fields
    setEmail('');
    setPassword('');
  };

  return (
    <div className="login">
      <div className="login-header">
      </div>
      <div className="login-container">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>} {/* Display the error message */}
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account? Click <Link to="/users/register">here</Link> to sign up.
        </p>
      </div>
    </div>
  );
};

export default Login;
