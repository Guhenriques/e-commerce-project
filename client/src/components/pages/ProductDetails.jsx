import React from 'react';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const { productId } = useParams();

  // You can fetch the product details using the productId
  // For simplicity, let's assume you have a products array
  // with all the product details
  const products = [
    { id: 1, name: 'Product 1', description: 'Description 1', price: 10 },
    { id: 2, name: 'Product 2', description: 'Description 2', price: 20 },
    { id: 3, name: 'Product 3', description: 'Description 3', price: 30 },
    // Add more products here
  ];

  // Find the product with the matching productId
  const product = products.find((product) => product.id === Number(productId));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
    </div>
  );
};

export default ProductDetails;
