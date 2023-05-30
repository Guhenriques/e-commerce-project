import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './dashboard.css';

import Logo from '../components/Logo';
import NavBar from '../components/NavBar';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:8000/users/current-user/11');
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const userData = await response.json();

        console.log('userData:', userData)
        
        setUser(userData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='dashboard'>
      <div className='dashboard-header'>
        <Logo />
        <NavBar />
      </div>
      <div className='dashboard-container'>
        <h2>Dashboard</h2>
        {user && (
          <div>
            <p>Welcome, {user.name}!</p> {/* Display the user's name */}
          </div>
        )}
        <nav>
          <ul>
            <li>
              <Link to='/profile'>Profile</Link>
            </li>
            <li>
              <Link to='/orders'>Orders</Link>
            </li>
            <li>
              <Link to='/edit-info'>Edit Info</Link>
            </li>
            <li>
              <Link to='/edit-address'>Edit Address</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Dashboard;
