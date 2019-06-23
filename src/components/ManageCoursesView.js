//react
import React, { Fragment, useEffect } from 'react';
//router
import { NavLink } from "react-router-dom";
//redux
import { useDispatch, useSelector } from 'react-redux';
import { getCourses, getUsers, getUser } from '../redux/selectors';
import { fetchCourses } from '../redux/actions';
//react-bootstrap
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

export default function SelectCoursesView() {

    const courses = useSelector(getCourses);
    const dispatch = useDispatch();
    useEffect(() => { dispatch(fetchCourses(true)) }, [dispatch]);

    const user = useSelector(getUser);
    const users = useSelector(getUsers);

    const courseItems = Object.keys(courses).map((key, i) => {

        const course = courses[key];

        return (
            <Card className='m-4' key={i}>
                <Card.Body>
                    <Card.Title>{course.title}</Card.Title>
                    <Card.Text>{course.description}</Card.Text>
                    <ButtonToolbar>
                        <NavLink to={`edit/courses/${key}`}>
                            <Button variant="primary" className="mr-sm-2">Edit</Button>
                        </NavLink>
                        <DropdownButton title="Add Course">
                            <Dropdown.Item key={i}
                                onClick={() => { console.log(user.email) }}>{user.email}</Dropdown.Item>
                            {Object.keys(users).map((key, i) => {
                                const otherUser = users[key];
                                return (
                                <Dropdown.Item key={i}
                                    onClick={() => { console.log(otherUser.email) }}>{otherUser.email}</Dropdown.Item>
                                )
                            })}
                        </DropdownButton>
                    </ButtonToolbar>
                </Card.Body>
            </Card>
        )

    });

    return (
        <Fragment>
            {courseItems}
        </Fragment>
    );
};