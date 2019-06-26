//react
import React, { Fragment } from 'react';
//router
import { Link } from "react-router-dom";
//redux
import { useSelector } from 'react-redux';
import { getCourseId, getLessons, getUser } from '../redux/selectors';
import { } from '../redux/actions';
//react-bootstrap
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge'

export default function LessonsView() {

    const user = useSelector(getUser);
    const courseId = useSelector(getCourseId);
    const lessons = useSelector(getLessons);

    const lessonItems = Object.keys(lessons).map((lessonId, i) => {

        const lesson = lessons[lessonId];

        let completed = false;
        let badge;

        try {
            completed = user.courses[courseId][lessonId].completed;
        } catch (err) { }


        if (completed) {
            badge = <Badge variant="secondary">Completed</Badge>;
        } else {
            badge = <Badge variant="primary">In Progress</Badge>;
        }

        return (
            <ListGroup.Item
                action
                as={Link}
                to={`/courses/${courseId}/lessons/${lessonId}`}
                key={i}
                className="d-flex justify-content-between">
                <div>{lesson.title}</div>
                <div>{badge}</div>
            </ListGroup.Item>
        );
    });

    return (
        <Fragment>
            <ListGroup>
                <ListGroup.Item className="list-group-header">Lessons</ListGroup.Item>
                {lessonItems}
            </ListGroup>
        </Fragment>
    );
};
