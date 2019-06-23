//react
import React, { Fragment, useEffect } from 'react';
//router
import { Link } from "react-router-dom";
//redux
import { useDispatch, useSelector } from 'react-redux';
import { getCourses } from '../redux/selectors';
import { fetchCourses } from '../redux/actions';
//react-bootstrap
import ListGroup from 'react-bootstrap/ListGroup';

export default function CoursesView() {

    const courses = useSelector(getCourses);
    const dispatch = useDispatch();
    useEffect(() => { dispatch(fetchCourses()) }, [dispatch]);

    const courseItems = Object.keys(courses).map((key, i) => {

        const course = courses[key];

        return (
            <ListGroup.Item action as={Link} to={`/courses/${key}`} key={i}>
                {course.title}
            </ListGroup.Item>
        );
    });

    return (
        <Fragment>
            <ListGroup>
                { courseItems }
            </ListGroup>
        </Fragment>
    );
};
