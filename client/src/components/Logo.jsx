import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo-v1.png';

const Logo = () => {
  return (
    <div className="logo-container">
      <Link to="/">
        <img className="logo-img" src={logo} alt="Logo" title="Back to the shop"/>
      </Link>
    </div>
  );
};

export default Logo;