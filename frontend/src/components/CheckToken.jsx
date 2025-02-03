import React, { useEffect } from 'react'
import DOMAIN from '../../config/config'
import { useNavigate } from 'react-router-dom'

const CheckToken = () => {
    const navigate = useNavigate()
    useEffect(() => {
        const check = async () => {
            const response = await fetch(`${DOMAIN}/check-token`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
            })

            // console.log(response)
            if (!response.ok) {
                return navigate('/login')
            }

            const data = await response.json()
            // console.log("data:", data)

            if (data.message === "token is valid") {
                // console.log("sdsds", data.message)
                return navigate('/main')
            }
        }

        check()
    }, [])
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        </div>
    )
}

export default CheckToken
