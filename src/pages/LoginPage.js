//react
import React, { Fragment, useState } from 'react';
//router
import { NavLink } from "react-router-dom";
//redux
import { useDispatch } from 'react-redux';
import { } from '../redux/selectors';
import { loginUser } from '../redux/actions';
//react-bootstrap
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function LoginPage() {

    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => dispatch(loginUser(email, password));

    const handleSubmit = (event) => {
        handleLogin();
        event.preventDefault();
        event.stopPropagation();
    };

    return (
        <Fragment>
            <Modal.Dialog>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text"
                                placeholder="Enter email"
                                value={email}
                                onChange={event => setEmail(event.target.value)} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password"
                                value={password}
                                onChange={event => setPassword(event.target.value)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit" onClick={handleLogin}>Login</Button>
                    <NavLink to="/signup">
                        <Button variant="success">Sign Up</Button>
                    </NavLink>
                </Modal.Footer>
            </Modal.Dialog>
        </Fragment>
    );
};
