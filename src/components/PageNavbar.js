//react
import React, { Fragment } from 'react';
//router
import { NavLink } from "react-router-dom";
//redux
import { useDispatch, useSelector } from 'react-redux';
import { getTitle, getUser } from '../redux/selectors';
import { logoutUser } from '../redux/actions';
//react-bootstrap
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar, { Brand } from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

/**
 * This is the default exported functional component called PageNavbar,
 * which can be imported from the file it lives in './PageNavbar.js'
 * @return {JSX}
 */
export default function PageNavbar() {

    //useSelector(selector) connects a selector function to the redux store
    const user = useSelector(getUser);
    const pageTitle = useSelector(getTitle);

    //dispatch (from useDispatch()) is a function we use to connect an action to the redux store
    const dispatch = useDispatch();

    //handleLogout wraps the logoutUser() function from actions in dispatch
    const handleLogout = () => dispatch(logoutUser());

    const renderCFCTooltip = props => (
        <div
            {...props}
            style={{
                backgroundColor: 'rgba(0, 0, 0, 0.85)',
                padding: '2px 10px',
                color: 'white',
                borderRadius: 3,
                ...props.style,
            }}
        >
            Canadian Fundraising Corporation
        </div>
    );

    const renderLogoutTooltip = props => (
        <div
            {...props}
            style={{
                backgroundColor: 'rgba(0, 0, 0, 0.85)',
                padding: '2px 10px',
                color: 'white',
                borderRadius: 3,
                ...props.style,
            }}
        >
            This is to logout
        </div>
    );

    //return (...) in a functional component returns the JSX view
    return (
        <Fragment>
            <Navbar bg="dark" className="d-flex justify-content-between mb-4" variant="dark" expand="lg">
            <OverlayTrigger placement="bottom-start"
                            delay={{ show: 250, hide: 400 }}
                            overlay={renderCFCTooltip}>
                    <Brand as={NavLink} to="/" className="logo-brand">CFC</Brand>
                </OverlayTrigger>
                <Brand as={NavLink} to="/">
                    {pageTitle}
                </Brand>
                <Navbar.Toggle />
                <Navbar.Collapse >
                    <Nav className="mr-auto">
                        <NavDropdown title="Actions">
                            <NavDropdown.Item as={NavLink} to="/courses">Manage Courses</NavDropdown.Item>
                            <NavDropdown.Item as={NavLink} to="/lessons">Manage Lessons</NavDropdown.Item>
                            {user.is_admin && <NavDropdown.Item as={NavLink} to="/create/course">Create Course</NavDropdown.Item>}
                            {user.is_admin && <NavDropdown.Item as={NavLink} to="/create/lesson">Create Lesson</NavDropdown.Item>}
                            <NavDropdown.Item as={NavLink} to="/metrics/user">User Metrics</NavDropdown.Item>
                            <NavDropdown.Item as={NavLink} to="/metrics/manager">Manager Metrics</NavDropdown.Item>
                            {user.is_admin && <NavDropdown.Item as={NavLink} to="/metrics/admin">Admin Metrics</NavDropdown.Item>}
                        </NavDropdown>
                    </Nav>
                    <Form inline>
                        <NavLink to="/profile">
                            <Button variant="outline-light" className="my-2 mr-2">Profile</Button>
                        </NavLink>
                        <OverlayTrigger placement="bottom-start"
                            delay={{ show: 250, hide: 400 }}
                            overlay={renderLogoutTooltip}>
                            <Button variant="outline-warning" className="my-2" onClick={handleLogout}>Logout</Button>
                        </OverlayTrigger>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        </Fragment>
    );
};
