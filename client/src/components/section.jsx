import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';

import keyboard from '../images/new-keyboard-minor.png';
import mouse from '../images/mouse.png';
import monitor from '../images/monitor.png';

import './section.css';

const Section = () => {
  const products = [
    { image: keyboard, title: 'The best keyboard you can have', price: 'For an incredible price!' },
    { image: mouse, title: 'The perfect mouse for your needs', price: 'Unbeatable price!' },
    { image: monitor, title: 'Immersive and high-resolution monitor', price: 'Great value for money!' },
  ];

  const [currentProduct, setCurrentProduct] = useState(0);
  const [imageHeight, setImageHeight] = useState(null);
  const [transitioning, setTransitioning] = useState(false);

  const handlePrevProduct = () => {
    if (!transitioning) {
      setTransitioning(true);
      setTimeout(() => {
        setCurrentProduct((prevProduct) => (prevProduct === 0 ? products.length - 1 : prevProduct - 1));
        setTransitioning(false);
      }, 350); // Adjust the transition duration as needed
    }
  };

  const handleNextProduct = () => {
    if (!transitioning) {
      setTransitioning(true);
      setTimeout(() => {
        setCurrentProduct((prevProduct) => (prevProduct === products.length - 1 ? 0 : prevProduct + 1));
        setTransitioning(false);
      }, 350); // Adjust the transition duration as needed
    }
  };

  const handleImageLoad = (event) => {
    setImageHeight(event.target.offsetHeight);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextProduct();
    }, 6000); // Change the interval duration as needed

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flashy-container">
      <div className="flashy-arrows">
        <Button className="flashy-arrow" onClick={handlePrevProduct} startIcon={<KeyboardArrowLeft />} />
        <Button className="flashy-arrow" onClick={handleNextProduct} endIcon={<KeyboardArrowRight />} />
      </div>
      <div className="flashy-content">
        <img
          className={`flashy-img ${transitioning ? 'transitioning' : ''}`}
          src={products[currentProduct].image}
          alt="Product"
          onLoad={handleImageLoad}
          style={{ height: imageHeight }}
        />
        <h1>{products[currentProduct].title}</h1>
        <p>{products[currentProduct].price}</p>
      </div>
    </div>
  );
};

export default Section;
