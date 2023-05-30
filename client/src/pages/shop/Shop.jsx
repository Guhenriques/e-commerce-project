import React from 'react';
import './shop.css'

import { PRODUCTS } from '../../Products';
import { Product } from './Product';

const Shop = () => {
  return (
    <div className="shop">
      <div className='shopTitle'>
        <h2>Products</h2>
      </div>
      <div className='products'> 
        {" "}
        {PRODUCTS.map((product) => (
          <Product data={product} />
        ))}
      </div>


    </div>
    
  );
};

export default Shop;