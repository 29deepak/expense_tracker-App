import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { UnorderedListOutlined } from '@ant-design/icons';
import { message } from 'antd';
const Header = () => {
    const navigate = useNavigate()
    const [loginUser, setLoginUser] = useState({})
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("loginusers"))
        if (user) {
            setLoginUser(user)
        }
    }, [])
    const logoutHandler = () => {
        localStorage.removeItem("loginusers")
        message.success("logout successfuly")
        navigate("/login")
    }
    return (
        <>

            <header class=" header-item">
                <div>

                    <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
                        <svg class="bi me-2" width="40" height="32"></svg>
                        <h4>Expense Management</h4>
                        <UnorderedListOutlined />
                    </a>
                </div>
                <div className='d-flex  p-2'>
                    {loginUser && loginUser.name}
                    <div>
                        <button onClick={logoutHandler}>logout</button>

                    </div>
                </div>


            </header>

        </>
    )
}

export default Header