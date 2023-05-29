import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Section from './components/Section';
import Main from './components/Main';

import Registration from './components/pages/Register';
import Login from './components/pages/Login';
import Dashboard from './components/pages/DashBoard';
import CartList from './components/pages/Cart';
import ProductDetails from './components/pages/ProductDetails';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <>
            <Header />
            <Section />
            <Main />
          </>
        }
        />
        <Route path="/products" element={<Main />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/users/register" element={<Registration />} />
        <Route path="users/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cart" element={<CartList />} />
      </Routes>
    </Router>
  );
};

export default App;
