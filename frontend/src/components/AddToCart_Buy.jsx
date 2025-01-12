import React, { useEffect, useState } from 'react'
import Header from './Header'
import { useParams, useSearchParams } from 'react-router-dom'
import '../css/AddToCart_Buy.css'
import { GoPlus } from "react-icons/go";
import { PiMinus } from "react-icons/pi";

import '../css/Header.css'
import { IoBagHandleSharp, IoCartOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

// domain
import DOMAIN from '../../config/config'

const AddToCart_Buy = () => {
  const [item, setItem] = useState({})
  const [image, setImage] = useState('')
  const [totalProductQuantity, setTotalProductQuantity] = useState(0)
  const [colorVariantsFiltered, setColorVariantsFiltered] = useState([])
  const [colorVariants, setColorVariants] = useState([])
  const [sizes, setSizes] = useState(null)
  const [stock, setStock] = useState(null)
  const [itemSizeStock, setItemSizeStock] = useState(null)
  const [itemColor, setItemColor] = useState([])
  const [variantImage, setvariantImage] = useState([])

  // selection
  const [selectedColor, setSelectedColor] = useState(null)
  const [selectedSize, setSelectedSize] = useState(null)
  // console.log(isClick)

  // check out
  const [productId, setProductId] = useState(null)
  const [variantId, setVariantId] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [sizeId, setSizeId] = useState(null)
  const [price, setPrice] = useState(null)

  const [condition, setCondition] = useState(false)
  // console.log('variant id', variantId)
  // console.log('condition', condition)

  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  // choose item
  const handleSelectedColor = (id) => {

    setCondition(true)
    setSelectedColor(id)
    console.log('id:', id)
    setVariantId(id)

    // console.log('s', item.variants.length)



    for (let index = 0; index < item.variants.length; index++) {

      if (item.variants[index]._id === id) {
        setSizes(item.variants[index].sizes)
        // console.log('size:', item.variants[index].sizes)
      }
    }

    let total = 0
    const result = item.variants.find(color => color._id === id)
    // console.log('res', result)

    result.sizes.forEach((size) => {
      size.forEach(innerArray => {
        const totalStock = total + innerArray.stock
        total = totalStock
        setStock(totalStock)
      })
    })

    // console.log('total stock:', total)
    // console.log(item)
    for (let index = 0; index < item.length; index++) {
      console.log('color', item[index].color)
      // if (item[index]._id === id) {
      //   console.log(item[index].color)
      // }
    }

  }


  const handleSelectedSize = (id) => {
    setSelectedSize(id)
    console.log('size id:', id)
    setSizeId(id)
    console.log(selectedColor)
    setCondition(false)

    const result = item.variants.find(color => color._id === selectedColor)
    result.sizes.forEach((size) => {
      size.forEach(innerArray => {
        if (innerArray._id === id) {
          console.log(innerArray.stock)
          setItemSizeStock(innerArray.stock)
        }
      })
    })
  }

  // check out
  const { id } = useParams()

  useEffect(() => {
    const productDetails = async () => {
      try {
        const response = await fetch(`${DOMAIN}/product-details/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        })

        const data = await response.json()


        // data.item.colorVariants.map(item => (
        //   setItemColor(item)
        // ))
        setProductId(data.item._id)

        // console.log('product:', data.item)
        // console.log('image', data.image)
        // console.log('variant id:', data.item._id)
        setImage(data.image)
        setItem(data.item)
        setvariantImage(data.productImage)

        // console.log(data.item.colorVariants.map(i => i.quantity)
        // console.log(data.item.colorVariants.filter(Boolean))

        // let total = 0;

        // let filtered = data.item.colorVariants.filter(Boolean)

        // calculate total quantity
        // calculateTotalQuantity(total, filtered)

        const a = [
          {
            id: 1,
            name: 'Product 1',
            variants: [
              { color: 'Red', size: 'M' },
              { color: 'Blue', size: 'L' },
            ],
          },
          {
            id: 2,
            name: 'Product 2',
            variants: [
              { color: 'Green', size: 'S' },
              { color: 'Black', size: 'XL' },
            ],
          },
        ];


        // setTotalProductQuantity(filtered.reduce((total, item) => total + item.quantity, 0))
      } catch (error) {
        console.log(error)
      }
    }

    productDetails()
  }, [])




  // const calculateTotalQuantity = (total, items) => {
  //   for (let i = 0; i < items.length; i++) {
  //     setTotalProductQuantity(total += items[i].quantity)
  //   }

  //   return total
  // }


  const handelAddQuantity = () => {
    setQuantity(quantity >= item.quantity ? quantity : quantity + 1)
  }


  const handelMinusQuantity = () => {
    setQuantity(quantity > 1 ? quantity - 1 : quantity)
  }



  const addToCart = async () => {
    if (!sizeId) {
      console.log('size is required')
      setErrorMessage('Color and Size are required')
      return;
    }

    const response = await fetch(`${DOMAIN}/add-item-to-cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ productId, variantId, quantity, sizeId })
    })

    const data = await response.json()
    if (data.message === 'item added') {
      setMessage('Item Added to Cart')
    }

  }



  // search
  const navigate = useNavigate()
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);


  const handleSendFunction = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${DOMAIN}/search?q=${query}`);
      const dataa = await response.json();
      // console.log(data)
      setResults(dataa);
      // result(data)
      navigate('/', { state: { dataa } });
    } catch (err) {
      console.error('Error fetching search results:', err);
    }
  };


  const handlLogout = () => {
    if (window.confirm("Do you want to logout?")) {
      navigate('/')
    }
  }


  const handleUnavailablePage = () => {
    alert('this page is not available')
}
  return (
    <>
      <header className='header'>
        <nav className='nav-bar'>
          <div className='nav-bar-child'>
            <a className='links' href="#" onClick={() => handleUnavailablePage()}>Seller Center</a>
            <a className='links' href="#" onClick={() => handleUnavailablePage()}>Start Selling</a>
            <a className='links' href="#" onClick={() => handleUnavailablePage()}>Download</a>
            <a className='links' href="#" onClick={() => handleUnavailablePage()}>Follow us on</a>
          </div>

          <div className='nav-bar-child'>
            <a className='links' href="#" onClick={() => handleUnavailablePage()}>Notifications</a>
            <a className='links' href="#" onClick={() => handleUnavailablePage()}>Help</a>
            <a className='links' href="#" onClick={() => handleUnavailablePage()}>English</a>
            <a className='links' href="#" onClick={() => handlLogout()}>Log out</a>
          </div>
        </nav>

        <div className='search-area'>
          <div className='logo-container'>
            <a className='logo' href="">
              <IoBagHandleSharp color='white' className='icon' />
            </a>

            <a className='logo' href="">
              <p>SHOPEE</p>
            </a>

          </div>

          {/* <div className='search-container'>
            <form style={{ backgroundColor: 'white', height: '45px', display: 'flex', alignItems: 'center', borderRadius: '5px' }} className='search-form' action="" >
              <input type="text"
                className='search-input'
                placeholder='Search for products'
                value={query}
                onChange={(e) => setQuery(e.target.value)} style={{ border: 'none' }} />

              <button style={{
                height: '40px', width: '10%', borderRadius: '3px', border: 'none', backgroundColor: 'red', color: 'white', fontSize: '14px',
                marginRight: '5px', cursor: 'pointer'
              }} onClick={handleSendFunction} type='submit'>Search</button>
            </form>
          </div> */}

          <div className='shopping-cart' >
            <IoCartOutline color='white' onClick={() => navigate('/cart')} />
          </div>
        </div>
      </header>

      {message ? <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', width: '80%',
        margin: '5px auto 0 auto', backgroundColor: 'green', height: '35px', borderRadius: '2px'
      }}>
        <p style={{ color: 'white', textAlign: 'center', }}>{message}</p>
      </div>

        :

        errorMessage && <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', width: '80%',
          margin: '5px auto 0 auto', backgroundColor: 'red', height: '35px', borderRadius: '2px'
        }}>
          <p style={{ color: 'white', textAlign: 'center', }}>{errorMessage}</p>
        </div>
      }

      {
      }


      <section className='product-container'>
        <section className='image-section'>
          <img src={image} alt="" />
        </section>

        <section className='product-datails-section'>
          <p className='title-product'>{item.title}</p>

          <p className='price-product'>₱{item.price}</p>

          <div className='color-container'>

            <div className='color-title-container'>
              <p className='color-title'>Color</p>
            </div>

            <div className='color-variants'>

              {item ? item?.variants?.map((color, index) => (
                <div key={color._id} className={`colors ${selectedColor === color._id ? 'isClick' : 'default'}`} onClick={() => handleSelectedColor(color._id)}>
                  <img src={variantImage[index]} alt="" style={{ width: '30px', height: 'auto' }} />
                  <p>{color.color}</p>
                </div>
              )) : <h2 style={{ color: 'black' }}>Loading...</h2>}


            </div>


          </div>

          <div className='sizes-container'>

            <div className='size-title-container'>
              <p className='size-title'>Sizes</p>
            </div>

            {selectedColor ? sizes?.map((s, index) => (
              <div key={index} className='size-sub-container-1'>
                {s.map((size) => (

                  <div key={size._id} className={`sizes ${selectedSize === size._id ? 'isClick' : 'default'} `} onClick={() => handleSelectedSize(size._id)}>
                    <p>{size.size}</p>
                  </div>
                ))}
              </div>
            )) : <p style={{ color: 'red' }}>Select color variant</p>}


          </div>


          <div>

          </div>
          <div className='quantity-container'>
            <div className='quantity-title-container'>

              <p className='quantity-title'>Quantity</p>

            </div>


            <div className='quantity-sub-container'>

              <div className='minus' onClick={() => handelMinusQuantity()}>
                <PiMinus color='black' />
              </div>

              <div className='quantity'>
                <p>{quantity}</p>
              </div>

              <div className='plus' onClick={() => handelAddQuantity()}>
                <GoPlus color='black' />
              </div>
              {/* 
              {colorVariantsFiltered.map((item) => (
                <p className='pieces'>{item.quantity} Pieces Available</p>
              ))} */}
              <p className='pieces'>{condition ? stock : itemSizeStock ? itemSizeStock : 0} Pieces Available</p>
            </div>


          </div>

          <div className='checkOutButton-container'>
            <button onClick={() => addToCart()} className='addToCartButton'>Add To Cart</button>
            <button className='buyNowButton'>Buy Now</button>
          </div>
        </section>



      </section>

    </>
  )
}

export default AddToCart_Buy
