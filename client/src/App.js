import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Section from './components/Section';
//import Main from './components/Main';

import Shop from './pages/shop/Shop';
import { ShopContextProvider } from './context/shop-context';

import Registration from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/DashBoard';
import CartList from './pages/cart/Cart';

const App = () => {
  return (
    //shopcontextprovider must wrap everything so every all components will have access to it
    <ShopContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={
            <>
              <Header />
              <Section />
              <Shop />
            </>
          }
          />
          <Route path="/products" element={<Shop />} />
          <Route path="/users/register" element={<Registration />} />
          <Route path="users/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/cart" element={<CartList />} />
        </Routes>
      </Router>
    </ShopContextProvider>
  );
};

export default App;
