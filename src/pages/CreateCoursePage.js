//react
import React, { useState } from 'react';
//router
import { } from "react-router-dom";
//redux
import { useDispatch } from 'react-redux';
import { } from '../redux/selectors';
import { createCourse } from '../redux/actions';
//react-bootstrap
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
//components
import Page from '../components/Page';
import ArrayStringFormGroup from '../components/ArrayStringFormGroup';

const emptyCourse = {
    title: '',
    description: '',
    mandatory: false,
    lessons: []
};

export default function CreateCoursePage() {

    const dispatch = useDispatch();

    const [courseState, setCourseState] = useState({...emptyCourse});

    const [lessons, setLessons] = useState([]);

    const handleCreateCourse = () => dispatch(createCourse({ ...courseState, lessons }));

    const handleSubmit = (event) => {
        handleCreateCourse();
        event.preventDefault();
        event.stopPropagation();
    };

    return (
        <Page title='Create Course'>
            <Modal.Dialog>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text"
                                value={courseState.title}
                                onChange={event => setCourseState({ ...courseState, title: event.target.value })} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text"
                                as="textarea"
                                rows="3"
                                value={courseState.description}
                                onChange={event => setCourseState({ ...courseState, description: event.target.value })} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Check type="checkbox"
                                label="Mandatory"
                                checked={courseState.mandatory}
                                onChange={event => setCourseState({ ...courseState, mandatory: event.target.checked })} />
                        </Form.Group>
                        <ArrayStringFormGroup
                            label="Lessons"
                            placeholder="Enter comma separated list of ids"
                            arrayInput={courseState.lessons}
                            setArrayInput={(arrayOutput) => setLessons(arrayOutput)}
                        />
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit" onClick={handleCreateCourse}>Create Course</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </Page>
    );
};
