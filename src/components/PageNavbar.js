//react
import React, { Fragment } from 'react';
//router
import { Link } from "react-router-dom";
//redux
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../redux/selectors';
import { logoutUser } from '../redux/actions';
//react-bootstrap
import Navbar, { Brand } from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function PageNavbar() {

    const dispatch = useDispatch();

    const user = useSelector(getUser);

    const handleLogout = () => dispatch(logoutUser());

    return (
        <Fragment>
            <Navbar bg="dark" className="justify-content-between" variant="dark">
                <Brand as={Link} to="/">
                    {`HR Learning System: ${user.first_name}`}
                </Brand>
                <Form inline>
                    <Button onClick={handleLogout}>Logout</Button>
                </Form>
            </Navbar>
        </Fragment>
    );
};
