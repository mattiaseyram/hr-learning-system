//react
import React, { useEffect } from 'react';
//router
import { } from "react-router-dom";
//redux
import { useDispatch, useSelector } from 'react-redux';
import { getLesson } from '../redux/selectors';
import { fetchLesson } from '../redux/actions';
//react-bootstrap
import { Jumbotron, Form } from 'react-bootstrap'
//components
import Page from '../components/Page';

export default function LessonPage({ match: { params } }) {

    // storage of quiz answers
    const quiz_ans = []

    const lesson = useSelector(getLesson) || {};

    const dispatch = useDispatch();

    useEffect(() => { dispatch(fetchLesson(params.lessonId)) }, [dispatch, params.lessonId]);

    // quiz form handler for submit
    const handleSubmit = event => {
        console.log(quiz_ans)
        // TODO call backend function
        event.preventDefault()
    }

    // handles input changes in the form
    //  e.target.name == quiz #
    //  e.target.id == value for answer in quiz #
    const handleChange = e => {
        quiz_ans[parseInt(e.target.name)] = e.target.id
    }

    // quizzes
    const quizzes = (lesson.questions ?
        lesson.questions.map((quiz, i) => {
            return (
                <div>
                    <h4>{quiz.question}</h4>
                        <Form.Group>
                            {quiz.options.map(ans => (
                                <Form.Check
                                type="radio"
                                label={ans}
                                name={`${i}`}
                                id={ans}
                                onChange={handleChange}
                            />
                            ))}
                        </Form.Group>
                </div>
            )
        }) : null);

    return (
        <Page title={lesson.title}>
            <Jumbotron>
                {lesson.title}
            </Jumbotron>
            {lesson.content}
            if (quizzes) {
                <div>
                    <h2>Quiz</h2>
                    <Form onSubmit={handleSubmit}>
                        {quizzes}
                        <input type="submit" value="Submit" />
                    </Form>
                </div>
            }
        </Page>
    );
};
