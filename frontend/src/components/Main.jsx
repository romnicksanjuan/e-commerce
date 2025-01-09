import React, { useEffect, useState } from 'react'
import shoes from '../images/shoes.jpg'
import '../css/Main.css'
import Header from './Header'
import banner1 from '../images/banners/banner1.jpg'
import banner2 from '../images/banners/banner2.jpg'
import banner3 from '../images/banners/banner3.jpg'

// side banner
import side_banner1 from '../images/banners/side-banner1.jpg'
import side_banner2 from '../images/banners/side-banner2.jpg'
import { useNavigate } from 'react-router-dom'

// domain
import DOMAIN from '../../config/config'


import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Main = () => {
    const [data, setData] = useState([])
    const [img, setImg] = useState([])

    const navigate = useNavigate()
    const [base64Images, setBase64Images] = useState();

    const banners = [banner1, banner2, banner3]


    useEffect(() => {
        const getProduct = async () => {
            try {
                const response = await fetch(`${DOMAIN}/get-all-product`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                const data = await response.json()



                // Convert the first image to a base64 string
                // const base64Image = imageBuffer[0].buffer.toString('base64');
                // const imageSrc = `data:${imageBuffer[0].contentType};base64,${base64Image}`;

                // setBase64Images(imageSrc)

                // console.log(data.map(d => d.images))

                // console.log(data.img)
                setImg(data.img)
                setData(data.product)
            } catch (error) {
                console.log(error)
            }
        }
        getProduct()
    }, [])


    const handleToAddOrBuyPageClick = (data) => {
        navigate(`/add-to-cart/buy/${data._id}`)
    }

    const [currentIndex, setCurrentIndex] = useState(0)
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % banners.length)
        }, 5000)

        return () => clearInterval(interval)
    }, [banners.length])


    const leftButton = () => {
        setCurrentIndex(prev => prev < 1 ? banners.length - 1 : prev - 1 )
    }

    const rightButton = () => {
        setCurrentIndex(prev => prev === banners.length - 1 ? 0 : prev + 1 )
    }


    const [result,setResult] = useState('')
    // recieve result firom header
    const handleRecievefunction = (data) =>{
        console.log(data)
        setImg(data.img)
        setData(data.products)
    }

    return (
        <>
            <Header result={handleRecievefunction} />
            <div className='main-container'>

                <div className='banners-container'>

                    <div className='main-banner-container'>

                        <div className='banner-track' style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                            {banners.map((banner, index) => (
                                <div key={index} className="banner-slide">
                                    <img src={banner} alt={`Slide ${index + 1}`} style={{ height: '100%', width: '100%' }} className="banner-image" />
                                </div>
                            ))}
                        </div>


                        <div className="indicators">
                            {banners.map((_, index) => (
                                <button
                                    key={index}
                                    className={`indicator ${index === currentIndex ? "active" : ""}`}
                                    onClick={() => setCurrentIndex(index)}
                                ></button>
                            ))}
                        </div>

                        <div className='left-icon' onClick={() => leftButton()}>
                            < FaChevronLeft size={24} color='white' />
                        </div>

                        <div className='right-icon' onClick={() => rightButton()}>
                            < FaChevronRight size={24} />
                        </div>

                    </div>




                    <div className='side-banner-container'>
                        <div style={{ height: '100%' }}>
                            <img src={side_banner1} alt="" style={{ width: '100%', height: '50%' }} />
                            <img src={side_banner2} alt="" style={{ width: '100%', height: '50%' }} />
                        </div>
                    </div>

                </div>

                <p className='daily-discover'>DAILY DISCOVER</p>


                <div className='main-sub-container'>
                    {data.map((data, index) => (
                        <div key={data._id} className="parent" onClick={() => handleToAddOrBuyPageClick(data)}>


                            <img src={img[index]} alt="" className="image" />

                            <div className='title-area'>
                                <p className='name'>{data.title}</p>

                                <div className='price-sold-container'>
                                    <p className='price'>₱{data.price}</p>
                                    <p className='sold'>3k sold</p>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </>
    )
}

export default Main
