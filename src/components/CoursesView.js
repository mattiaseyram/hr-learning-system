//react
import React, { Fragment, useEffect } from 'react';
//router
import { Link } from "react-router-dom";
//redux
import { useDispatch, useSelector } from 'react-redux';
import { getUser, getCourses } from '../redux/selectors';
import { fetchCourses } from '../redux/actions';
//react-bootstrap
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';

export default function CoursesView() {

    const dispatch = useDispatch();

    const user = useSelector(getUser);
    const courses = useSelector(getCourses);

    useEffect(() => { dispatch(fetchCourses()) }, [dispatch]);

    const courseItems = Object.keys(courses).map((courseId, i) => {

        const course = courses[courseId];
        
        let completed = false;
        let badge;

        try {
            completed = user.courses[courseId].completed;
        } catch (err) { }

        if (completed) {
            badge = <Badge variant="success">Completed</Badge>;
        } else {
            badge = <Badge variant="primary">In Progress</Badge>;
        }

        return (
            <ListGroup.Item
                action
                as={Link}
                to={`/courses/${courseId}`}
                key={i}
                className="d-flex justify-content-between">
                    <div>{course.title}</div>
                    <div>{badge}</div>
            </ListGroup.Item>
        );
    });

    return (
        <Fragment>
            <ListGroup>
                <ListGroup.Item className="list-group-header">Courses</ListGroup.Item>
                {courseItems}
            </ListGroup>
        </Fragment>
    );
};
