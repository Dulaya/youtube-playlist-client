import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

import { Container, Col, Form, ListGroup, Button } from 'react-bootstrap';

import UserContext from '../context/UserContext';
import { loginURL } from '../urls';

const columnStyle = {
    margin: '10px auto',
}

const inputStyle = {
    margin: '2.5px auto',
    width: '100%',
}

const Login = () => {
    let history = useHistory();
    const { currentToken, setCurrentToken, currentUser, setCurrentUser } = useContext(UserContext);

    const handleLogin = async (e) => {
        e.preventDefault();

        const userInfo = {
            username: document.getElementById('username').value,
            password: document.getElementById('password').value,
        }

        try {
            const { data } = await axios.post(loginURL, userInfo);

            const token = data;
            const decoded = jwt_decode(token);

            //Local Storage
            //IMPORTANT: Make sure to set localStorage before changing state.
            //Because once the state change, the DOM rerenders and go to User page with undefined token.
            localStorage.setItem('userToken', data);

            setCurrentToken(data);
            setCurrentUser(decoded.data.userName);

            //If correct credential, redirect to user page.
            history.push(`/${decoded.data.userName}`);
        } catch (error) {
            //Update token state to blank if login fail
            setCurrentToken('');

            alert('Wrong Username and/or Password.');
            console.log(error);
        }
    }

    //Toggle between Login and Registration pages
    const switchToRegistration = () => history.push('/register');

    return (
        <Container >
            <Col sm='12' md='8' lg='6' style={columnStyle}>
                <Form onSubmit={handleLogin}>
                    <ListGroup >
                        <ListGroup.Item onClick={switchToRegistration} style={{ textAlign: 'center' }}>Login</ListGroup.Item>
                        <ListGroup.Item >
                            <Form.Control id='username' placeholder='username' style={inputStyle} />
                            <Form.Text className="text-muted">
                                Min. 6 characters
                            </Form.Text>
                        </ListGroup.Item>
                        <ListGroup.Item >
                            <Form.Control type="password" id='password' placeholder='password' style={inputStyle} />
                            <Form.Text className="text-muted">
                                Min. 6 characters
                            </Form.Text>
                        </ListGroup.Item>
                        <ListGroup.Item >
                            <Button type='submit' value='Log In' style={inputStyle} >
                                Login
                            </Button>
                            <Button onClick={switchToRegistration} style={inputStyle} variant='outline-dark' >
                                Switch to Registration
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Form>
            </Col>

        </Container>
    );
}

export default Login;