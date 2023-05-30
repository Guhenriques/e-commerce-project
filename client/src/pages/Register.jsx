import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Logo from '../components/Logo';
import NavBar from '../components/NavBar';

import './register.css'

const Registration = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRegistration = async () => {
    try {
      const response = await fetch('http://localhost:8000/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        // Handle registration error
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      // Registration successful
      const data = await response.json();
      console.log('User registered with ID:', data.id);

      // Authenticate the user and create a session
      await handleAuthentication(email, password);

      // Redirect the user to the login page or perform any other necessary actions
      window.location.href = '/dashboard'; // Example redirect to '/logged-in' page

    } catch (error) {
      console.error('Registration failed:', error.message);
      setError(error.message); // Set the error message to display to the user
      // Handle error
    }
  };

  const handleAuthentication = async (email, password) => {
    try {
      const response = await fetch('http://localhost:8000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        // Handle authentication error
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      // Authentication successful
      // Redirect the user to the logged-in page or perform any other necessary actions
      window.location.href = '/logged-in'; // Example redirect to '/logged-in' page

    } catch (error) {
      console.error('Authentication failed:', error.message);
      // Handle error
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await handleRegistration();
      // Registration successful, handle success (e.g., redirect the user)
    } catch (error) {
      console.error('Registration failed: ', error.message)
    }
    // Reset form fields
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="registration">
      <div className='register-header'>
        <Logo />
        <NavBar />
      </div>
      <div className='register-container'>
        <h2>Create an Account</h2>
        {error && <p className="error-message">{error}</p>} {/* Display the error message */}
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={handleNameChange}
        />

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
          <button type="submit">Register</button>
        </form>
        <p>
          Already have an account? Click <Link to="/users/login">here</Link> to sign in.
        </p>
      </div>
    </div>
  );
};

export default Registration;
