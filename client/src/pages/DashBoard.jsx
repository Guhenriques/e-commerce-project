import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './dashboard.css';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = localStorage.getItem('token'); // Retrieve the token from local storage
        if (!userData) {
          throw new Error('Authentication token not found');
        }

        const tokenObject = JSON.parse(userData);
        const userId = tokenObject.id;

        console.log('Token User Id:', userId);

        /*
        const response = await fetch(`http://localhost:8000/users/current-user/`, {
          headers: {
            Authorization: `Bearer ${tokenData}`, // Pass the token in the request headers
          },
        });
        console.log('Response: do Fetch', response); // Check the response object
        
        
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        */
        console.log('tokenObject:', tokenObject);

        setUser(tokenObject);
        setLoading(false);

      } catch (error) {
        console.error('Error:', error); // Log the error for debugging
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
