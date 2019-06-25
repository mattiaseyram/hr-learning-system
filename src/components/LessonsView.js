//react
import React, { Fragment } from 'react';
//router
import { Link } from "react-router-dom";
//redux
import { useSelector } from 'react-redux';
import { getCourseId, getLessons } from '../redux/selectors';
import { } from '../redux/actions';
//react-bootstrap
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge'

export default function LessonsView() {

    const courseId = useSelector(getCourseId);
    const lessons = useSelector(getLessons);

    const lessonItems = Object.keys(lessons).map((key, i) => {

        const lesson = lessons[key];
        let badge;
        if (lesson.Completed){
            badge=<Badge variant="secondary">Completed</Badge>
        }else{
            badge=<Badge variant="primary">In Progress</Badge>
        }

        return (
            <ListGroup.Item action as={Link} to={`/courses/${courseId}/lessons/${key}`} key={i}>
                {lesson.title} {badge}
            </ListGroup.Item>
        );
    });

    return (
        <Fragment>
            <ListGroup>
                <ListGroup.Item className="list-group-header">Lessons</ListGroup.Item>
                { lessonItems }
            </ListGroup>
        </Fragment>
    );
};
