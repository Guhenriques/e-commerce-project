import React from 'react';
import { Link } from 'react-router-dom';

import './dashboard.css';

import Logo from '../Logo';
import NavBar from '../NavBar';

const Dashboard = () => {
  return (
    <div className='dashboard'>
      <div className='dashboard-header'>
        <Logo />
        <NavBar />
      </div>
      <div className="dashboard-container">
        <h2>Dashboard</h2>
        <nav>
          <ul>
            <li>
              <Link to="/dashboard/profile">Profile</Link>
            </li>
            <li>
              <Link to="/dashboard/orders">Orders</Link>
            </li>
            <li>
              <Link to="/dashboard/edit-info">Edit Info</Link>
            </li>
            <li>
              <Link to="/dashboard/edit-address">Edit Address</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Dashboard;
