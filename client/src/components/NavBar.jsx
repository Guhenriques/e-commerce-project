import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';

const NavBar = () => {
  return (
    <div className="nav-bar">
      <Link to="/">
        <button className="nav-shop">Shop</button>
      </Link>
      <Link to="/cart">
        <button className="nav-cart">Cart</button>
      </Link>
      <Link to="/users/register">
        <button className="nav-account">Account</button>
      </Link>
    </div>
  );
};

export default NavBar;