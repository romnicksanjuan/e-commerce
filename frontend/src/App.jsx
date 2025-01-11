import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// components
import Main from './components/Main.jsx'
import AddToCart_Buy from './components/AddToCart_Buy.jsx';
import CreateProduct from './components/CreateProduct.jsx';
import Test from './components/Test.jsx';
import Cart from './components/Cart.jsx';
import Login from './components/Login.jsx';
// import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* login page */}
          <Route path='/' element={<Login />} />

          {/* main page */}
          <Route path='/main' element={< Main />} />

          {/* buy or add to cart page */}
          <Route path='/add-to-cart/buy/:id' element={< AddToCart_Buy />} />

          {/* create product */}
          <Route path='/create-product' element={< CreateProduct />} />

          {/* test */}
          <Route path='/test' element={< Test />} />

          {/* cart page */}
          <Route path='/cart' element={<Cart />} />


        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
