import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import NavBar from './components/NavBar';

import Shop from './pages/shop/Shop';
import { Cart } from './pages/cart/Cart';
import { ShopContextProvider } from './context/shop-context';

import Registration from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/DashBoard';

const App = () => {
  return (
    //shopcontextprovider must wrap everything so every all components will have access to it
    <ShopContextProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/users/register" element={<Registration />} />
          <Route path="users/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </ShopContextProvider>
  );
};

export default App;
