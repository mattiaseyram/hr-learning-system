//react
import React, { Fragment, useState } from 'react';
//router
import { } from "react-router-dom";
//redux
import { useDispatch } from 'react-redux';
import { } from '../redux/selectors';
import { createUser } from '../redux/actions';
//react-bootstrap
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function SignUpPage() {

    const dispatch = useDispatch();

    const [userState, setUserState] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        role: '',
        manages: [],
        courses: {}
    });

    const handleCreateUser = () => dispatch(createUser(userState));

    const handleSubmit = (event) => {
        handleCreateUser();
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
                                value={userState.email}
                                onChange={event => setUserState({ ...userState, email: event.target.value })} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password"
                                value={userState.username}
                                onChange={event => setUserState({ ...userState, password: event.target.value })} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text"
                                placeholder="Enter first name"
                                value={userState.first_name}
                                onChange={event => setUserState({ ...userState, first_name: event.target.value })} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text"
                                placeholder="Enter last name"
                                value={userState.last_name}
                                onChange={event => setUserState({ ...userState, last_name: event.target.value })} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit" onClick={handleCreateUser}>Create User</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </Fragment>
    );
};
