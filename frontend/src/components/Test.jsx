import React, { useState } from 'react';
import LoadingAnimation from './Loading';
import DOMAIN from '../../config/config';
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

  const t = async () => {
    const res = await fetch(`${DOMAIN}/test`,{
        method:'GET',
        credentials:'include',
        headers: {
            'Content-Type': 'application/json',
        }
    })

    const data = await res.json()

    console.log(data)

}

  const handleSubmit = () => {
    const totalPrice = selectedProducts.reduce((acc, item) => acc + item.price, 0);
    console.log('Selected products:', selectedProducts);
    console.log('Total price:', totalPrice);
  };

  const [show,setShow] = useState(false)
  // setShow(true)

  return (
    <div style={{position:'relative', height:'100%',width:'100vh',backgroundColor:'black'}}>
      <button onClick={() => t()} >test</button>
      <div className="loading"></div>

      {show ? <p style={{color:'red'}}>Helooo pota</p> : ''}
    </div>
  );
};

export default Test;
