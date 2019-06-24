//react
import React, { Fragment, useEffect } from 'react';
//router
import { NavLink } from "react-router-dom";
//redux
import { useDispatch, useSelector } from 'react-redux';
import { getLessons } from '../redux/selectors';
import { fetchLessons, deleteLesson } from '../redux/actions';
//react-bootstrap
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Card from 'react-bootstrap/Card';

export default function ManageLessonsView() {

    const lessons = useSelector(getLessons);
    const dispatch = useDispatch();
    useEffect(() => { dispatch(fetchLessons()) }, [dispatch]);

    const handleDeleteLesson = async (lessonId) => {
        await dispatch(deleteLesson(lessonId));
        dispatch(fetchLessons());
    };

    const lessonItems = Object.keys(lessons).map((lessonId, i) => {

        const lesson = lessons[lessonId];

        return (
            <Card className='m-4' key={i}>
                <Card.Body>
                    <Card.Title>{lesson.title}</Card.Title>
                    <ButtonToolbar>
                        <NavLink to={`/edit/lessons/${lessonId}`}>
                            <Button variant="primary" className="mr-sm-2">Edit</Button>
                        </NavLink>
                        <Button variant="danger"
                            onClick={() => handleDeleteLesson(lessonId)}
                            className="mr-sm-2" >Delete</Button>
                    </ButtonToolbar>
                </Card.Body>
            </Card>
        )

    });

    return (
        <Fragment>
            {lessonItems}
        </Fragment>
    );
};