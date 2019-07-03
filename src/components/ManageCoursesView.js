//react
import React, { Fragment, useEffect } from 'react';
//router
import { NavLink } from "react-router-dom";
//redux
import { useDispatch, useSelector } from 'react-redux';
import { getCourses, getUsers, getUser } from '../redux/selectors';
import { fetchCourses, addCoursesToUser, deleteCourse } from '../redux/actions';
//react-bootstrap
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

export default function ManageCoursesView() {

    const courses = useSelector(getCourses);
    const dispatch = useDispatch();
    useEffect(() => { dispatch(fetchCourses(true)) }, [dispatch]);

    const user = useSelector(getUser);
    const users = useSelector(getUsers);

    const handleAddCourseToUser = (userId, courseId) => { dispatch(addCoursesToUser(userId, [courseId])) };

    const handleDeleteCourse = async (courseId) => {
        await dispatch(deleteCourse(courseId));
        dispatch(fetchCourses(true));
    };

    const getDropdownButton = (courseId) => (
        <DropdownButton title="Add Course To User" className="mr-sm-2">
            <Dropdown.Item onClick={() => { handleAddCourseToUser(null, courseId) }}
            >{user.email}</Dropdown.Item>

            {Object.keys(users).map((userId, i) => {
                const otherUser = users[userId];
                return (
                    <Dropdown.Item onClick={() => { handleAddCourseToUser(userId, courseId) }}
                        key={i}>{otherUser.email}</Dropdown.Item>
                )
            })}
        </DropdownButton>
    );

    const courseItems = Object.keys(courses).map((courseId, i) => {

        const course = courses[courseId];

        return (
            <Card className='my-4' key={i}>
                <Card.Body>
                    <Card.Title>{course.title}</Card.Title>
                    <Card.Text>{course.description}</Card.Text>
                    <ButtonToolbar>
                        {getDropdownButton(courseId)}
                        {user.is_admin &&
                            <NavLink to={`/edit/courses/${courseId}`}>
                                <Button variant="primary" className="mr-sm-2">Edit</Button>
                            </NavLink>
                        }
                        <Button variant="danger"
                            onClick={() => handleDeleteCourse(courseId)}
                            className="mr-2" >Delete</Button>
                    </ButtonToolbar>
                </Card.Body>
            </Card>
        );

    });

    return (
        <Fragment>
            {courseItems}
        </Fragment>
    );
};