import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Section from './components/Section';
import Main from './components/Main';

import ProductDetails from './components/pages/ProductDetails';
import Registration from './components/pages/Register';
import CartList from './components/pages/Cart';

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
        <Route path="/cart" element={<CartList />} />
      </Routes>
    </Router>
  );
};

export default App;
