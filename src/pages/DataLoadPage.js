//react
import React from 'react';
//router
import { } from "react-router-dom";
//redux
import { useDispatch } from 'react-redux';
import { } from '../redux/selectors';
import { createLesson } from '../redux/actions';
//react-bootstrap
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
//components
import Page from '../components/Page';

export default function CreateCoursePage() {

    const dispatch = useDispatch();

    const handleAction = () => {

        //replace this whatever you'd like
        dispatch(createLesson({
            title: 'Lesson 1',
            content: 'This is a lesson.',
            questions: [
                {
                    question: 'What is my name?',
                    answer: 'Daddy',
                    options: ['Mommy', 'Daddy']
                }
            ]
        }));

    };

    return (
        <Page title='Data Load'>
            <Modal.Dialog>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleAction}>Execute Action</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </Page>
    );
};
