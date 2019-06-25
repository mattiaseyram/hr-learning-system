//react
import React, { Fragment } from 'react';
//router
import { NavLink } from "react-router-dom";
//redux
import { useDispatch, useSelector } from 'react-redux';
import { getTitle } from '../redux/selectors';
import { logoutUser } from '../redux/actions';
//react-bootstrap
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar, { Brand } from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';

/**
 * This is the default exported functional component called PageNavbar,
 * which can be imported from the file it lives in './PageNavbar.js'
 * @return {JSX}
 */
export default function PageNavbar() {

    //useSelector(selector) connects a selector function to the redux store
    const pageTitle = useSelector(getTitle);

    //dispatch (from useDispatch()) is a function we use to connect an action to the redux store
    const dispatch = useDispatch();

    //handleLogout wraps the logoutUser() function from actions in dispatch
    const handleLogout = () => dispatch(logoutUser());

    //return (...) in a functional component returns the JSX view
    return (
        <Fragment>
            <Navbar bg="dark" className="d-flex justify-content-between mb-4" variant="dark" expand="lg">
                <Brand as={NavLink} to="/" className="logo-brand">CFC</Brand>
                <Brand as={NavLink} to="/">
                    {pageTitle}
                </Brand>
                <Navbar.Toggle />
                <Navbar.Collapse >
                    <Nav className="mr-auto">
                        <NavDropdown title="Actions">
                            <NavDropdown.Item as={NavLink} to="/courses">Manage Courses</NavDropdown.Item>
                            <NavDropdown.Item as={NavLink} to="/lessons">Manage Lessons</NavDropdown.Item>
                            <NavDropdown.Item as={NavLink} to="/create/course">Create Course</NavDropdown.Item>
                            <NavDropdown.Item as={NavLink} to="/create/lesson">Create Lesson</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Form inline>
                        <NavLink to="/profile">
                            <Button variant="outline-light" className="my-1 mr-2">Profile</Button>
                        </NavLink>
                        <Button variant="outline-warning" className="my-1" onClick={handleLogout}>Logout</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        </Fragment>
    );
};
