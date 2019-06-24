//react
import React, { useState } from 'react';
//router
import { } from "react-router-dom";
//redux
import { useDispatch } from 'react-redux';
import { } from '../redux/selectors';
import { createLesson } from '../redux/actions';
//react-bootstrap
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
//components
import Page from '../components/Page';

export default function CreateLessonPage() {

    const dispatch = useDispatch();

    const [lessonState, setLessonState] = useState({
        title: ''
    });

    const handleCreateLesson = () => dispatch(createLesson(lessonState));

    const handleSubmit = (event) => {
        handleCreateLesson();
        event.preventDefault();
        event.stopPropagation();
    };

    return (
        <Page title='Create Lesson'>
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
                    <Button variant="primary" type="submit" onClick={handleCreateLesson}>Create Lesson</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </Page>
    );
};
