//react
import React, { Fragment, useState } from 'react';
//router
import { } from "react-router-dom";
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

    const [username, setUsername] = useState('');

    const handleLogin = () => dispatch(loginUser(username));

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
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text"
                                placeholder="Enter username"
                                value={username}
                                onChange={event => setUsername(event.target.value)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit" onClick={handleLogin}>Login</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </Fragment>
    );
};
