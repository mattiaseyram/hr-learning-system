//react
import React, { useState } from 'react';
//router
import { } from "react-router-dom";
//redux
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../redux/selectors';
import { updateUser, deleteUser } from '../redux/actions';
//react-bootstrap
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
//components
import Page from '../components/Page';

export default function ProfilePage() {

    const dispatch = useDispatch();

    const user = useSelector(getUser);

    //initialize userState to redux store's user
    const [userState, setUserState] = useState(user);

    const handleUpdateUser = () => dispatch(updateUser(userState));
    const handleDeleteUser = () => dispatch(deleteUser());

    const handleSubmit = (event) => {
        handleUpdateUser();
        event.preventDefault();
        event.stopPropagation();
    };

    return (
        <Page title='Profile'>
            <Modal.Dialog>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
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
                    <Button variant="primary" type="submit" onClick={handleUpdateUser}>Update User</Button>
                    <Button variant="danger" onClick={handleDeleteUser}>Delete User</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </Page>
    );
};
