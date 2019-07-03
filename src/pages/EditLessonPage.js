//react
import React, { useState, useEffect } from 'react';
//router
import { } from "react-router-dom";
//redux
import { useDispatch, useSelector } from 'react-redux';
import { getLesson, getLessonId, getUser } from '../redux/selectors';
import { updateLesson, fetchLesson, setWarning } from '../redux/actions';
//react-bootstrap
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
//react-markdown
import ReactMde from 'react-mde';
import ReactMarkdown from 'react-markdown';
//components
import Page from '../components/Page';
import NotFoundPage from './NotFoundPage';

//css
import 'react-mde/lib/styles/css/react-mde-all.css';

const emptyLesson = {
    title: '',
    content: '',
    questions: []
};

export default function EditLessonPage({ match: { params } }) {

    const dispatch = useDispatch();

    const user = useSelector(getUser);
    const lesson = useSelector(getLesson) || emptyLesson;
    const lessonId = useSelector(getLessonId);

    const [lessonState, setLessonState] = useState({ ...emptyLesson, ...lesson });

    const [questions, setQuestions] = useState({});

    const [tab, setTab] = useState('write');

    const handleUpdateLesson = () => {
        try {
            const questionsJson = JSON.parse(questions);
            dispatch(updateLesson(lessonId, { ...lessonState, questions: questionsJson }));
        }
        catch (err) {
            dispatch(setWarning('Invalid Questions JSON, please fix and try again.'));
        }
    };

    const handleSubmit = (event) => {
        handleUpdateLesson();
        event.preventDefault();
        event.stopPropagation();
    };

    //set questions to stringified lesson.questions
    useEffect(() => { setQuestions(JSON.stringify(lessonState.questions)); }, [lessonState.questions]);

    //fetch lesson by route param
    useEffect(() => { dispatch(fetchLesson(params.lessonId)) }, [dispatch, params.lessonId]);

    //sets lessonState to lesson when lesson loads
    useEffect(() => { setLessonState({ ...lesson }) }, [lesson]);

    if (!user.is_admin) return (<NotFoundPage />);

    return (
        <Page title='Edit Lesson'>
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
                    <Button variant="primary" type="submit" onClick={handleUpdateLesson}>Update Lesson</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </Page>
    );
};
