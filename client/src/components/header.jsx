import logo from '../logo-v1.png';
import React from 'react';
import './header.css'

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
        <button className='nav-shop'>Shop</button>
        <button className='nav-cart'>Cart</button>
        <button className='nav-account'>Account</button>
      </div>
    </header>
  )
}

export default Header;