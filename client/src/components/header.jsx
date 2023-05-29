import logo from '../logo-v1.png';
import React from 'react';
import './header.css'

import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className='header'>
      <div className="logo-container">
        <img className='logo-img'
          src={logo}
          alt="Logo"
        />
      </div>

      <div className='search-bar'>
        <input type="text" placeholder="Find a product..." />
        <button type="submit">Search</button>
      </div>

      <div className='nav-bar'>
        <Link to='/products'>
          <button className='nav-shop'>Shop</button>
        </Link>
        <Link to='/cart'>
          <button className='nav-cart'>Cart</button>
        </Link>
        <Link to="/users/register">
          <button className='nav-account'>Account</button>
        </Link>
      </div>
    </header>
  )
}

export default Header;