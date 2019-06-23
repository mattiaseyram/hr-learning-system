//react
import React, { useState } from 'react';
//router
import { } from "react-router-dom";
//redux
import { useDispatch } from 'react-redux';
import { } from '../redux/selectors';
import { } from '../redux/actions';
//react-bootstrap
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { createCourse } from '../redux/actions';
//components
import Page from '../components/Page';

export default function CreateCoursePage() {

    const dispatch = useDispatch();

    const [courseState, setCourseState] = useState({
        title: '',
        description: '',
        mandatory: false
    });

    const handleCreateCourse = () => dispatch(createCourse(courseState));

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
                                value={courseState.mandatory}
                                onChange={event => setCourseState({ ...courseState, mandatory: event.target.checked })} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit" onClick={handleCreateCourse}>Create Course</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </Page>
    );
};
