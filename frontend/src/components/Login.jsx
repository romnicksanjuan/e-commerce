import React, { useEffect, useState } from "react";
import '../css/Login.css'
import DOMAIN from '../../config/config.js'
import { signInWithGoogle, signInWithFaceBook } from "../firebase/firebase.js";
import { useNavigate } from "react-router-dom";
function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [user, setUser] = useState(null);
    const [loginMethod, setLoginMethod] = useState(null);

    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const [message, setMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        const reset = () => {
            setMessage('')
            setErrorMessage('')
        }
        reset()
    }, [email, password])


    const handleSubmit = async () => {
        // console.log(loading)
        setLoading(!loading)
        if (email === '' || password === '') {
            setErrorMessage('Please Enter Username and Password')
            setLoading(loading)
            return;
        }
        setErrorMessage(null)
        const response = await fetch(`${DOMAIN}/sign-in`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",


            },
            credentials: 'include',
            body: JSON.stringify({ email, password })
        })

        const data = await response.json()
        setLoading(!loading)
        console.log(!loading)
        console.log(data)

        if (data.message === 'success') {
            console.log('User Login Success')
            setMessage('User Login Success')
            navigate('/main')
        } else {
            console.log('Incorrect Username or Password')
            setMessage('Incorrect Username or Password')
            setLoading(loading)
        }

    }
    // navigate('/main')
    const google = async () => {

        const user = await signInWithGoogle()

        if (user) {
            console.log(user)
            try {
                const response = await fetch(`${DOMAIN}/signIn-with-google`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include",
                    body: JSON.stringify({ user: user })
                })
                const data = await response.json()

                console.log(data)
                navigate('/main')
            } catch (error) {
                console.log(error)
            }
        }
    }

    const facebook = async () => {
        
        const user =await signInWithFaceBook()

        if (user) {
            console.log(user)
            try {
                const response = await fetch(`${DOMAIN}/signIn-with-facebook`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include",
                    body: JSON.stringify({ user: user })
                })
                const data = await response.json()

                console.log(data)
                navigate('/main')
            } catch (error) {
                console.log(error)
            }
        }
    }



    return (
        <div className="login-page">
            <div className="login-container">

                <div className="logo-section">
                    <img
                        src="https://4.bp.blogspot.com/-ItRaVmM-PoU/XgrlppcnvcI/AAAAAAAABPY/Pbgwlu9Gb7UKLJFekuqk5__OPWQvqq08gCLcBGAsYHQ/s1600/shopee%2B1.png"
                        alt="Shopee Logo"
                        className="logo"
                    />
                    <h1>Shopee</h1>
                    <p>The leading online shopping platform in Southeast Asia and Taiwan</p>
                </div>

                <div className={`login-form ${loading ? 'unable' : ''}`}>



                    <div className={`loading-indicator ${loading ? 'show' : ''}`}></div>

                    <div style={{ width: '100%', padding: '10px', position: 'relative' }}>

                        {/* <h2>Log In</h2> */}

                        {/* <p style={{color:'black',fontSize:'12px'}}>sample account</p>  */}
                        <span style={{ color: 'black', fontSize: '16px', marginRight: '10px' }}> username:user@gmail.com</span>
                        <span style={{ color: 'black', fontSize: '16px' }}> password:user</span>
                        <form className="formm">

                            {errorMessage ? <span style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</span> : message === 'User Login Success' ? <span style={{ color: 'green', textAlign: 'center' }}>{message}</span> : <span style={{ color: 'red', textAlign: 'center' }}>{message}</span>}
                            <input type="text" value={email} placeholder="email" className="form-input" onChange={(event) => setEmail(event.target.value)} />
                            <input type="password" value={password} placeholder="Password" className="form-input" onChange={(event) => setPassword(event.target.value)} />
                            <button type="button" className="login-button" onClick={() => handleSubmit()}>LOG IN</button>
                        </form>
                        <div className="form-options">
                            <a href="#">Forgot Password</a>
                            <a href="#">Log In with Phone Number</a>
                        </div>
                        <p>OR</p>
                        <div className="social-buttons">
                            <button className="social-button facebook" onClick={() => facebook()}>Facebook</button>
                            <button className="social-button google" onClick={() => google()}>Google</button>
                        </div>
                        {/* <div className="sign-up">
                        <p>New to Shopee? <a href="#">Sign Up</a></p>
                    </div> */}
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Login;
