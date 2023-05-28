import React from 'react';
import './main.css';
import { Card, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import keyboard from '../images/new-keyboard-minor.png';
import mouse from '../images/mouse.png';
import monitor from '../images/monitor-minor.png';
import headset from '../images/headset-minor.png';
import mousepad from '../images/mousepad2-minor.png';
import soundbar from '../images/pc-soundbar-minor.png';
import microphone from '../images/microphone-minor.png';
import webcam from '../images/webcam-minor.png';

const Main = () => {
  const products = [
    { id: 1, name: 'Razer Gaming Mice', description: 'Description 1', price: 10, image: mouse },
    { id: 2, name: 'Samsung Monitor', description: 'Description 2', price: 20, image: monitor },
    { id: 3, name: 'Logitech Gaming Keyboard', description: 'Description 3', price: 30, image: keyboard },
    { id: 4, name: 'Razer Headset', description: 'Description 4', price: 40, image: headset },
    { id: 5, name: 'Coolermaster Mousepad', description: 'Description 5', price: 50, image: mousepad },
    { id: 6, name: 'TCL Soundbar', description: 'Description 6', price: 60, image: soundbar },
    { id: 7, name: 'Hyperx Microphone', description: 'Description 7', price: 70, image: microphone },
    { id: 8, name: 'Logitech Webcam', description: 'Description 8', price: 80, image: webcam },
  ];

  return (
    <div className="main">
      <h2>Products</h2>
      <div className="product-list">
        {products.map((product) => (
          <Link to={`/products/${product.id}`} key={product.id} className="product-card-link">
            <Card className="product-card">
              <img src={product.image} alt={product.name} className="product-card-image" />
              <CardContent className="product-card-content">
                <Typography variant="h5" component="h3">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {product.description}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p" className="product-card-price">
                  Price: ${product.price}
                </Typography>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Main;