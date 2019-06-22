//react
import React, { Fragment, useState } from 'react';
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
//components
import CourseFormItems from '../components/CourseFormItems';

export default function CreateCoursePage() {

    const dispatch = useDispatch();

    const [courseState, setCourseState] = useState({
        title: '',
        description: '',
        mandatory: false
    });

    const handleCreateCourse = () => {};

    const handleSubmit = (event) => {
        handleCreateUser();
        event.preventDefault();
        event.stopPropagation();
    };

    const formProps = { courseState, setCourseState };

    return (
        <Fragment>
            <Modal.Dialog>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <CourseFormItems {...formProps}/>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit" onClick={handleCreateCourse}>Create Course</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </Fragment>
    );
};
