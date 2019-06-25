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
import Badge from 'react-bootstrap/Badge';

export default function CoursesView() {

    const courses = useSelector(getCourses);
    const dispatch = useDispatch();
    useEffect(() => { dispatch(fetchCourses()) }, [dispatch]);

    const courseItems = Object.keys(courses).map((key, i) => {

        const course = courses[key];
        let badge;
        if (course.completed){
            badge=<Badge variant="secondary">Completed</Badge>
        }else{
            badge=<Badge variant="primary">In Progress</Badge>
        }

        return (
            <ListGroup.Item action as={Link} to={`/courses/${key}`} key={i}>
                {course.title} {badge}
            </ListGroup.Item>
        );
    });

    return (
        <Fragment>
            <ListGroup>
                <ListGroup.Item className="list-group-header">Courses</ListGroup.Item>
                { courseItems }
            </ListGroup>
        </Fragment>
    );
};
