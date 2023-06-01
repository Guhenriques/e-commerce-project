import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './dashboard.css';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = localStorage.getItem('token'); // Retrieve the token from local storage
        if (!userData) {
          throw new Error('Authentication token not found');
        }

        const tokenObject = JSON.parse(userData); // Parse the token to a Json object
        const userId = tokenObject.id; 

        const response = await fetch(`http://localhost:8000/users/${userId}`, { // Using the userId took from the userData object, make a response to the server using the id already known
          headers: {
            Authorization: `Bearer ${userData}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const userDataResponse = await response.json();

        console.log('tokenObject:', tokenObject);
        console.log('UserDataResponse:', userDataResponse)

        if (userDataResponse.length > 0) {
          const userObject = userDataResponse[0];
          console.log('User:', userObject);
        }

        setUser(userDataResponse[0]);
        setLoading(false);

      } catch (error) {
        console.error('Error:', error); // Log the error for debugging
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/users/login');
  }

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
            <li>
              <button onClick={handleLogout}>Logout</button> {/* Add the logout button */}
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Dashboard;
