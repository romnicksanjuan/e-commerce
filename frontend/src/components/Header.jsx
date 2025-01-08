import React from 'react'
import '../css/Header.css'
import { IoBagHandleSharp, IoCartOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';


const Header = () => {
    const navigate = useNavigate()
    return (
        <header className='header'>
            <nav className='nav-bar'>
                <div className='nav-bar-child'>
                    <a className='links' href="">Seller Center</a>
                    <a className='links' href="">Start Selling</a>
                    <a className='links' href="">Download</a>
                    <a className='links' href="">Follow us on</a>
                </div>

                <div className='nav-bar-child'>
                    <a className='links' href="">Notifications</a>
                    <a className='links' href="">Help</a>
                    <a className='links' href="">English</a>
                    <a className='links' href="">Log out</a>
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

                <div className='search-container'>
                    <form className='search-form' action="" >
                        <input type="text" className='search-input' placeholder='Search for products' />
                    </form>
                </div>

                <div className='shopping-cart' >
                    <IoCartOutline color='white' onClick={() => navigate('/cart')}/>
                </div>
            </div>
        </header>
    )
}

export default Header
