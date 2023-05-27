import React from 'react';

import { Button } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';

import keyboard from '../images/keyboard.png';
import mouse from '../images/mouse.png';
import monitor from '../images/monitor.png'
import './section.css';

const Section = () => {
  const products = [
    { image: keyboard, title: 'The best keyboard you can have', price: 'For an incredible price!' },
    { image: mouse, title: 'The perfect mouse for your needs', price: 'Unbeatable price!' },
    { image: monitor, title: 'Immersive and high-resolution monitor', price: 'Great value for money!' }
  ];

  const [currentProduct, setCurrentProduct] = React.useState(0);
  const [imageHeight, setImageHeight] = React.useState(null);

  const handlePrevProduct = () => {
    setCurrentProduct((prevProduct) => (prevProduct === 0 ? products.length - 1 : prevProduct - 1));
  };

  const handleNextProduct = () => {
    setCurrentProduct((prevProduct) => (prevProduct === products.length - 1 ? 0 : prevProduct + 1));
  };

  const handleImageLoad = (event) => {
    setImageHeight(event.target.offsetHeight);
  };

  return (
    <div className='flashy-container'>
      <Button className='flashy-arrow' onClick={handlePrevProduct} startIcon={<KeyboardArrowLeft />}>
      </Button>
      <div className='flashy-content'>
        <img
          className='flashy-img'
          src={products[currentProduct].image}
          alt='Product'
          onLoad={handleImageLoad}
          style={{ height: imageHeight }}
        />
        <h1>{products[currentProduct].title}</h1>
        <p>{products[currentProduct].price}</p>
      </div>
      <Button className='flashy-arrow' onClick={handleNextProduct} endIcon={<KeyboardArrowRight />}>
      </Button>
    </div>
  );
};

export default Section;