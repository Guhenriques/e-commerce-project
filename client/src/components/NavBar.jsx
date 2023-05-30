import React from "react";
import { Link } from "react-router-dom";

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import "./navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="links">
        <Link to="/"> Shop </Link>
        <Link to="/cart">
          <ShoppingCartIcon size={32} />
        </Link>
        <Link to="/users/register"> Account </Link>
      </div>
    </div>
  );
};

export default Navbar;