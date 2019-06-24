//react
import React, { useState, useEffect } from 'react';
//router
import { } from "react-router-dom";
//redux
import { useDispatch, useSelector } from 'react-redux';
import { getLesson } from '../redux/selectors';
import { updateLesson, fetchLesson } from '../redux/actions';
//react-bootstrap
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
//components
import Page from '../components/Page';

export default function EditLessonPage({ match: { params } }) {

    const lesson = useSelector(getLesson) || (
        {
            title: '',
            description: '',
            mandatory: false
        }
    );

    const [lessonState, setLessonState] = useState(lesson);

    const dispatch = useDispatch();

    //fetch lesson by route param
    useEffect(() => { dispatch(fetchLesson(params.lessonId)) }, [dispatch, params.lessonId]);

    //sets lessonState to lesson when lesson loads
    useEffect(() => { setLessonState({ ...lesson }) }, [lesson]);

    const handleUpdateLesson = () => dispatch(updateLesson(params.lessonId, lessonState));

    const handleSubmit = (event) => {
        handleUpdateLesson();
        event.preventDefault();
        event.stopPropagation();
    };

    return (
        <Page title='Update Lesson'>
            <Modal.Dialog>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text"
                                value={lessonState.title}
                                onChange={event => setLessonState({ ...lessonState, title: event.target.value })} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit" onClick={handleUpdateLesson}>Update Lesson</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </Page>
    );
};
