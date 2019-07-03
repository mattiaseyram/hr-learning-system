//react
import React, { Fragment, useEffect } from 'react';
//router
import { NavLink } from "react-router-dom";
//redux
import { useDispatch, useSelector } from 'react-redux';
import { getLessons, getUser } from '../redux/selectors';
import { fetchLessons, deleteLesson } from '../redux/actions';
//react-bootstrap
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Card from 'react-bootstrap/Card';

export default function ManageLessonsView() {

    const user = useSelector(getUser);
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
            <Card className='my-4' key={i}>
                <Card.Body>
                    <Card.Title>{lesson.title}</Card.Title>
                    <ButtonToolbar>
                        {user.is_admin &&
                            <NavLink to={`/edit/lessons/${lessonId}`}>
                                <Button variant="primary" className="mr-sm-2">Edit</Button>
                            </NavLink>
                        }
                        <Button variant="danger"
                            onClick={() => handleDeleteLesson(lessonId)}
                            className="mr-2" >Delete</Button>
                    </ButtonToolbar>
                </Card.Body>
            </Card>
        );

    });

    return (
        <Fragment>
            {lessonItems}
        </Fragment>
    );
};