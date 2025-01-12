import React, { useEffect, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import '../css/Footer.css'
import style from '../css/Cart.module.css'
import '../css/Header.css'
import { IoBagHandleSharp, IoCartOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

// domain
import DOMAIN from '../../config/config.js'
const Cart = () => {
    const navigate = useNavigate()

    const [cart, setCart] = useState([])
    const [img, setImg] = useState([])
    const [total, setTotal] = useState(0)


    const [selectedProducts, setSelectedProducts] = useState([]);


    const [message, setMessage] = useState('')

    // console.log(selectedProducts)
    const handleCheckboxChange = (event, carts) => {
        const { checked } = event.target;

        console.log(carts._id)
        setSelectedProducts((prev) => {
            if (checked) {
                // Add product to selectedProducts array
                return [...prev, carts];
            } else {
                // Remove product from selectedProducts array
                return prev.filter((item) => item._id !== carts._id);
            }
        });
    };

    useEffect(() => {
        const handleSubmit = () => {
            const totalPrice = selectedProducts.reduce(
                (acc, cart) =>
                    acc + cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
                0
            );

            console.log('Selected carts:', selectedProducts);
            console.log('Total price:', totalPrice);
            setTotal(totalPrice)
        };
        handleSubmit()
    }, [selectedProducts])

    useEffect(() => {
        const getCart = async () => {
            const response = await fetch(`${DOMAIN}/cart`, {
                method: 'GET',
            })
            // console.log(response)
            const data = await response.json()
            // console.log('data', data.cart)
            setImg(data.image)
            setCart(data.cart)
        }
        getCart()
    }, [])

    const handlLogout = () => {
        if (window.confirm("Do you want to logout?")) {
            navigate('/')
        }
    }

    const del_Item = async (id) => {
        try {
            const response = await fetch(`${DOMAIN}/delete-cart/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Tyoe': 'Application/json' }
            })

            const data = await response.json()
            if (data.message) {
                setMessage('Item Removed from Cart')
                setCart(cart.filter(item => item._id !== id))
            }
            console.log(data)

        } catch (error) {
            console.log(error)
        }
    }

    const handleUnavailablePage = (e) => {
       window.alert('this page is not available')
    }
    return (
        <div>
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
                               <form style={{backgroundColor:'white',height:'45px',display:'flex',alignItems:'center',borderRadius:'5px'}} className='search-form' action="" >
                                   <input type="text"
                                       className='search-input'
                                       placeholder='Search for products'
                                       value={query}
                                       onChange={(e) => setQuery(e.target.value)} style={{border:'none'}}/>
           
                                   <button style={{ height:'40px',width:'10%',borderRadius:'3px',border:'none',backgroundColor:'red',color:'white',fontSize:'14px',
                                       marginRight:'5px',cursor:'pointer'}} onClick={handleSendFunction} type='submit'>Search</button>
                               </form>
                           </div> */}

                    <div className='shopping-cart' >
                        <IoCartOutline color='white' onClick={() => navigate('/cart')} />
                    </div>
                </div>
            </header>

            {message && <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', width: '80%',
                margin: '5px auto 0 auto', backgroundColor: 'green', height: '35px', borderRadius: '2px'
            }}>
                <p style={{ color: 'white', textAlign: 'center', }}>{message}</p>
            </div>
            }

            <div className={style.mainCartContainer}>
                <div className={style.title}>
                    <div className={style.checkBoxAll}>
                        <input type="checkbox" />
                    </div>

                    <div className={style.productTitle}>
                        <p>Product</p>
                    </div>

                    <div className={style.productDetailsTitle}>
                        <div className={style.productDetailsInnerContainer}>
                            <p>Unit Price</p>
                        </div>

                        <div className={style.productDetailsInnerContainer}>
                            <p>Quantity</p>
                        </div>
                        <div className={style.productDetailsInnerContainer}>
                            <p>Total Price</p>
                        </div>

                        <div className={style.productDetailsInnerContainer}>
                            <p>Actions</p>
                        </div>
                    </div>
                </div>


                {cart.map((carts, i) => (
                    <div key={carts._id} className={style.itemMainContainer}>


                        <div className={style.itemContainer}>

                            <div className={style.itemCheckBoxContainer}>
                                <input type="checkbox" onChange={(event) => handleCheckboxChange(event, carts)} />
                            </div>

                            <div className={style.productItemContainer}>
                                <img src={img[i]} alt="" style={{ width: '100px', height: 'auto' }} />

                                {
                                    carts.items.map(i => (
                                        <div key={i._id}>
                                            <p>{i.product_id.title}</p>
                                        </div>
                                    ))
                                }

                            </div>

                            {carts.items.map((item, index) => (
                                <div key={item._id} className={style.itemDetailsTitle}>
                                    <div className={style.itemDetailsInnerContainer}>
                                        <p>{item.price}</p>
                                    </div>

                                    <div className={style.itemDetailsInnerContainer}>
                                        <p>{item.quantity}</p>
                                    </div>

                                    <div className={style.itemDetailsInnerContainer}>
                                        <p>{carts.total_price}</p>
                                    </div>

                                    <div className={style.itemDetailsInnerContainer}>
                                        <p onClick={() => del_Item(carts._id)}>Delete</p>
                                    </div>
                                </div>
                            ))}



                        </div>

                    </div>
                ))}

            </div>


            <footer className="footer">
                <div className="footer-content">
                    <p style={{ fontSize: '20px', fontWeight: "500" }}>Total ({selectedProducts.length} item): ₱ {total} </p>
                    <button style={{
                        width: '20%', backgroundColor: 'white', height: '50px', border: 'none',
                        color: 'red', fontWeight: '500', borderRadius: '5px'
                    }}>Check Out</button>
                </div>
            </footer>
        </div>
    )
}

export default Cart
