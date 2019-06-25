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

    const lesson = useSelector(getLesson) || {};

    const dispatch = useDispatch();

    useEffect(() => { dispatch(fetchLesson(params.lessonId)) }, [dispatch, params.lessonId]);

    // quizzes
    const quizzes = (lesson.questions ? lesson.questions.map((quiz, i) => {
        return (
            <div>
                <h4>{quiz.question}</h4>
                <Form>
                    <Form.Group>
                        {quiz.options.map(ans => (
                            <Form.Check
                            type="radio"
                            label={ans}
                            name={`quiz-group-${i}`}
                            id={ans}
                        />
                        ))}
                    </Form.Group>
                </Form>
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
                    {quizzes}
                </div>
            }
        </Page>
    );
};
