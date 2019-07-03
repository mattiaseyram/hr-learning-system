//react
import React, { useState, useEffect } from 'react';
//router
import { } from "react-router-dom";
//redux
import { useDispatch, useSelector } from 'react-redux';
import { getCourse, getCourseId, getUser } from '../redux/selectors';
import { updateCourse, fetchCourse } from '../redux/actions';
//react-bootstrap
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
//components
import Page from '../components/Page';
import ArrayStringFormGroup from '../components/ArrayStringFormGroup';
import NotFoundPage from './NotFoundPage';

const emptyCourse = {
    title: '',
    description: '',
    mandatory: false,
    lessons: []
};

export default function EditCoursePage({ match: { params } }) {

    const dispatch = useDispatch();

    const user = useSelector(getUser);
    const course = useSelector(getCourse);
    const courseId = useSelector(getCourseId);

    const [courseState, setCourseState] = useState({...emptyCourse, ...course});

    const [lessons, setLessons] = useState([]);

    const handleUpdateCourse = () => dispatch(updateCourse(courseId, { ...courseState, lessons }));

    const handleSubmit = (event) => {
        handleUpdateCourse();
        event.preventDefault();
        event.stopPropagation();
    };

    //fetch course by route param
    useEffect(() => { dispatch(fetchCourse(params.courseId)); }, [dispatch, params.courseId] );

    //sets courseState to course when course loads
    useEffect(() => { setCourseState({...emptyCourse, ...course}); }, [course]);

    if (!user.is_admin) return (<NotFoundPage/>);
    
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
                    <Button variant="primary" type="submit" onClick={handleUpdateCourse}>Update Course</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </Page>
    );
};
