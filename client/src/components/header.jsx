import React from 'react';

import Logo from './Logo';
import NavBar from './NavBar';
import './header.css'

const Header = () => {
  return (
    <header className='header'>
      <Logo />
      <div className='search-bar'>
        <input type="text" placeholder="Find a product..." />
        <button type="submit">Search</button>
      </div>
      <NavBar />
    </header>
  )
}

export default Header;