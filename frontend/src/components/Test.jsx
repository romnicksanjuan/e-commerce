import React, { useState } from 'react';
import LoadingAnimation from './Loading';
const Test = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);

  const products = [
    { id: 1, name: 'Product 1', price: 10.99 },
    { id: 2, name: 'Product 2', price: 20.50 },
    { id: 3, name: 'Product 3', price: 15.75 },
  ];

  const handleCheckboxChange = (event, product) => {
    const { checked } = event.target;

    setSelectedProducts((prev) => {
      if (checked) {
        // Add product to selectedProducts array
        return [...prev, product];
      } else {
        // Remove product from selectedProducts array
        return prev.filter((item) => item.id !== product.id);
      }
    });
  };

  const handleSubmit = () => {
    const totalPrice = selectedProducts.reduce((acc, item) => acc + item.price, 0);
    console.log('Selected products:', selectedProducts);
    console.log('Total price:', totalPrice);
  };

  return (
    <div>

        <LoadingAnimation />
      <h3>Select Products</h3>
      {products.map((product) => (
        <div key={product.id}>
          <label>
            <input
              type="checkbox"
              onChange={(event) => handleCheckboxChange(event, product)}
            />
            {product.name} - ${product.price.toFixed(2)}
          </label>
        </div>
      ))}
      <button onClick={handleSubmit}>Get Selected Products</button>

      <h4>Selected Products:</h4>
      <ul>
        {selectedProducts.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Test;
