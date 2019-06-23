//react
import React, { Fragment } from 'react';
//router
import { NavLink } from "react-router-dom";
//redux
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../redux/selectors';
import { logoutUser } from '../redux/actions';
//react-bootstrap
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar, { Brand } from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

/**
 * This is the default exported functional component called PageNavbar,
 * which can be imported from the file it lives in './PageNavbar.js'
 * @return {JSX}
 */
export default function PageNavbar() {

    //useSelector(selector) connects a selector function to the redux store
    const user = useSelector(getUser);

    //dispatch (from useDispatch()) is a function we use to connect an action to the redux store
    const dispatch = useDispatch();

    //handleLogout wraps the logoutUser() function from actions in dispatch
    const handleLogout = () => dispatch(logoutUser());

    //return (...) in a functional component returns the JSX view
    return (
        <Fragment>
            <Navbar bg="dark" className="justify-content-between" variant="dark">
                <Brand as={NavLink} to="/">
                    {`HR Learning System: ${user.first_name}`}
                </Brand>
                <Nav className="mr-auto">
                    <NavDropdown title="Actions">
                            <NavDropdown.Item as={NavLink} to="/createcourse">Create Course</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <Form inline>
                    <NavLink to="/profile">
                        <Button variant="primary" className="mr-sm-2">Profile</Button>
                    </NavLink>
                    <Button variant="secondary" onClick={handleLogout}>Logout</Button>
                </Form>
            </Navbar>
        </Fragment>
    );
};
