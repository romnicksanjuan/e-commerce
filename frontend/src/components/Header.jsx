import React, { useState, useEffect } from 'react'
import '../css/Header.css'
import { IoBagHandleSharp, IoCartOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import DOMAIN from '../../config/config';


const Header = ({ result }) => {
    const navigate = useNavigate()
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);


    const handleSendFunction = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`${DOMAIN}/search?q=${query}`);
            const data = await response.json();
            // console.log(data)
            setResults(data);
            result(data)
        } catch (err) {
            console.error('Error fetching search results:', err);
        }
    };



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
                    <form style={{backgroundColor:'white',height:'45px',display:'flex',alignItems:'center',borderRadius:'5px'}} className='search-form' action="" >
                        <input type="text"
                            className='search-input'
                            placeholder='Search for products'
                            value={query}
                            onChange={(e) => setQuery(e.target.value)} style={{border:'none'}}/>

                        <button style={{ height:'40px',width:'10%',borderRadius:'3px',border:'none',backgroundColor:'red',color:'white',fontSize:'14px',
                            marginRight:'5px',cursor:'pointer'}} onClick={handleSendFunction} type='submit'>Search</button>
                    </form>
                </div>

                <div className='shopping-cart' >
                    <IoCartOutline color='white' onClick={() => navigate('/cart')} />
                </div>
            </div>
        </header>
    )
}

export default Header
