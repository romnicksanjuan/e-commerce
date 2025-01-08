import React, { useEffect, useState } from 'react'
import Header from './Header'
import style from '../css/Cart.module.css'

// domain
import DOMAIN from '../../config/config'
const Cart = () => {
    const [cart, setCart] = useState([])
    const [img, setImg] = useState([])


    useEffect(() => {
        const getCart = async () => {
            const response = await fetch(`${DOMAIN}/cart`, {
                method: 'GET',
            })
            // console.log(response)
            const data = await response.json()
            console.log('data', data.cart)
            setImg(data.image)
            setCart(data.cart)
        }
        getCart()
    }, [])
    return (
        <div>
            <Header />
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
                                <input type="checkbox" />
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
                                        <p>Delete</p>
                                    </div>
                                </div>
                            ))}



                        </div>

                    </div>
                ))}






            </div>
        </div>
    )
}

export default Cart
