import React, { useEffect } from 'react'
import { Button, Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
const Login = () => {
    const navigate = useNavigate()
    const submitHandler = async (values) => {
        console.log(values)
        try {
            await axios.post("http://localhost:4000/login", values)
                .then((res) => {
                    console.log(res)
                    message.success("Login Successfully")
                    localStorage.setItem("loginusers", JSON.stringify({ ...res.data, password: "" }))
                    navigate("/")
                })
        } catch (err) {
            message.error("invalid username or password")
        }
    }
    useEffect(() => {
        if (localStorage.getItem("loginusers")) {
            navigate("/")
        }
    }, [navigate])
    return (
        <div className='d-flex align-items-center justify-content-center' >
            <Form
                name="basic"
                onFinish={submitHandler}

            >
                <h1>Login Form</h1>


                <Form.Item label="Email" name="email">
                    <Input type="email" />
                </Form.Item>
                <Form.Item label="Password" name="password">
                    <Input type="password" />
                </Form.Item>
                <div><Link to="/register">Not Registered ? click Here To Register</Link></div>






                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Login