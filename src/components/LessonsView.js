//react
import React, { Fragment } from 'react';
//router
import { Link } from "react-router-dom";
//redux
import { useSelector } from 'react-redux';
import { getLessons } from '../redux/selectors';
import { } from '../redux/actions';
//react-bootstrap
import ListGroup from 'react-bootstrap/ListGroup';

export default function LessonsView() {

    const lessons = useSelector(getLessons);

    const lessonItems = Object.keys(lessons).map((key, i) => {

        const lesson = lessons[key];

        return (
            <ListGroup.Item action as={Link} to={`/lessons/${key}`} key={i}>
                {lesson.title}
            </ListGroup.Item>
        );
    });

    return (
        <Fragment>
            <ListGroup>
                { lessonItems }
            </ListGroup>
        </Fragment>
    );
};