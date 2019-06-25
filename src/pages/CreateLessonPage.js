//react
import React, { useState, useEffect } from 'react';
//router
import { } from "react-router-dom";
//redux
import { useDispatch } from 'react-redux';
import { } from '../redux/selectors';
import { createLesson, setWarning } from '../redux/actions';
//react-bootstrap
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
//react-markdown
import ReactMde from 'react-mde';
import ReactMarkdown from 'react-markdown';
//components
import Page from '../components/Page';

//css
import 'react-mde/lib/styles/css/react-mde-all.css';

const emptyLesson = {
    title: '',
    content: '',
    questions: []
};

export default function CreateLessonPage() {

    const dispatch = useDispatch();

    const [lessonState, setLessonState] = useState({ ...emptyLesson });

    const [questions, setQuestions] = useState({});

    const [tab, setTab] = useState('write');

    const handleCreateLesson = () => {
        try {
            const questionsJson = JSON.parse(questions);
            dispatch(createLesson({ ...lessonState, questions: questionsJson }));
        }
        catch (err) {
            dispatch(setWarning('Invalid Questions JSON, please fix and try again.'));
        }
    };

    const handleSubmit = (event) => {
        handleCreateLesson();
        event.preventDefault();
        event.stopPropagation();
    };

    useEffect(() => { setQuestions(JSON.stringify(lessonState.questions)); }, [lessonState.questions]);

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
                    <div className="container">
                        <ReactMde
                            onChange={(content) => setLessonState({ ...lessonState, content })}
                            value={lessonState.content}
                            generateMarkdownPreview={markdown => Promise.resolve(<ReactMarkdown source={markdown} />)}
                            emptyPreview={<div />}
                            onTabChange={(tb) => setTab(tb)}
                            selectedTab={tab}
                        />
                        <Form.Group>
                            <Form.Label>Questions</Form.Label>
                            <Form.Control type="text"
                                as="textarea"
                                rows="5"
                                value={questions}
                                onChange={event => setQuestions(event.target.value)} />
                        </Form.Group>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit" onClick={handleCreateLesson}>Create Lesson</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </Page>
    );
};
