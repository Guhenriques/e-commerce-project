import React, { useContext } from 'react';
import { PRODUCTS } from '../../Products';
import { ShopContext } from '../../context/shop-context';
import { CartItem } from './CartItem';

import { useNavigate } from 'react-router-dom';

import './cart.css';

export const Cart = () => {
  const { cartItems, getTotalCartAmount } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();
  
  const navigate = useNavigate();

  return (
    <div className='cart'>
      <div>
      <h1>Your Cart Items</h1>
      </div>
      <div className='cartItems'>
        {PRODUCTS.map((product) => { 
          // if the product id is not equal to 0, is a product that is in the cart
          if (cartItems[product.id] !== 0) {
            return <CartItem data={product} key={product.id} />;
          } else {
            return null;
          }
        })}
      </div>
      {totalAmount > 0 ?
        <div className='checkout'>
          <p> Subtotal: £ {totalAmount} </p>
          <button onClick={() => {navigate("/")}}> Continue Shopping </button>
          <button> Checkout </button>
        </div>
      : <h2>Your Cart is Empty</h2>} 
    </div>
  )

};
