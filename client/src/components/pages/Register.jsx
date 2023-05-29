import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './register.css'

const Registration = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        // Handle registration error
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      // Registration successful
      const data = await response.json();
      console.log('User registered with ID:', data.id);

      // Redirect the user to the login page or perform any other necessary actions
    } catch (error) {
      console.error('Registration failed:', error.message);
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
    setEmail('');
    setPassword('');
  };

  return (
    <div className="registration">
      <div className='register-header'>
      </div>
      <div className='register-container'>
        <h2>Create an Account</h2>
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
          Already have an account? Click <Link to="/login">here</Link> to sign in.
        </p>
      </div>
    </div>
  );
};

export default Registration;
