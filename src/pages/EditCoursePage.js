//react
import React, { useState, useEffect } from 'react';
//router
import { } from "react-router-dom";
//redux
import { useDispatch, useSelector } from 'react-redux';
import { getCourse } from '../redux/selectors';
import { updateCourse, fetchCourse } from '../redux/actions';
//react-bootstrap
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
//components
import Page from '../components/Page';

export default function EditCoursePage({ match: { params } }) {

    const course = useSelector(getCourse) || (
        {
            title: '',
            description: '',
            mandatory: false
        }
    );

    const [ courseState, setCourseState ] = useState(course);

    const dispatch = useDispatch();

    //fetch course by route param
    useEffect(() => { dispatch(fetchCourse(params.courseId)) }, [dispatch, params.courseId]);

    //sets courseState to course when course loads
    useEffect(() => { setCourseState({ ...course }) }, [ course ]);

    const handleUpdateCourse = () => dispatch(updateCourse(params.courseId, courseState));

    const handleSubmit = (event) => {
        handleUpdateCourse();
        event.preventDefault();
        event.stopPropagation();
    };

    return (
        <Page title='Update Course'>
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
                    <Button variant="primary" type="submit" onClick={handleUpdateCourse}>Update Course</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </Page>
    );
};
