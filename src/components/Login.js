import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'


const Login = () => {

    const navigate = useNavigate()
    const [mail, setMail] = useState('')
    const [pwd, setPwd] = useState('')
    const adminMailId = "nasar@benfy.co"
    const adminPwd = "123"

    const handleLogin = () => {
        if (adminMailId == mail && adminPwd == pwd) {
            navigate('/editusers')
        }
        else {
            alert('InCorrect Mail Id or Password')
        }
    }


    return (
        <>
            <section className='section-bg section-fit d-flex align-items-center'>
                <div className="container">
                    <h1 className='text-center m-0'>Log In</h1>
                    <div className="row align-items-center justify-content-evenly">
                        <div className='col-md-4 col-lg-4'>
                            <Form className='py-5 text-center'>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="email" onChange={(e) => { setMail(e.target.value) }} placeholder="nasar@benfy.co" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Control type="password" placeholder="123" onChange={(e) => { setPwd(e.target.value) }} />
                                </Form.Group>

                                <Button className='login-btn my-4' onClick={handleLogin}>
                                    Submit
                                </Button>
                            </Form>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-12 text-center'>
                            <Link to='/' className='go-back-link'>Go Back</Link>
                        </div>
                    </div >
                </div>
            </section>
        </>
    );
}

export default Login;