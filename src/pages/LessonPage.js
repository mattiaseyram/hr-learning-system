//react
import React, { useEffect } from 'react';
//router
import { } from "react-router-dom";
//redux
import { useDispatch, useSelector } from 'react-redux';
import { getLesson } from '../redux/selectors';
import { fetchLesson } from '../redux/actions';
//react-bootstrap
import { Jumbotron, Form, FormCheck } from 'react-bootstrap'
//components
import Page from '../components/Page';

export default function LessonPage({ match: { params } }) {

    const lesson = useSelector(getLesson) || {};

    const dispatch = useDispatch();

    useEffect(() => { dispatch(fetchLesson(params.lessonId)) }, [dispatch, params.lessonId]);

    // quizzes
    const quizzes = (lesson.questions ? lesson.questions.map((quiz, i) => {
        return (
            <Form>
                {quiz.options.map(ans => (
                    <div className="radio-buttons">
                    <h3>{ans.question}</h3>
                    <label>
                        <input
                            type="radio"
                            name="radio-butt"
                            value={ans}
                        />
                        {ans}
                    </label>
                    </div>
                ))}
            </Form>
            )
    }) : null);

    return (
        <Page title={lesson.title}>
            <Jumbotron>
                {lesson.title}
            </Jumbotron>
            {lesson.content}
            <h2>Quizzes</h2>
            { quizzes }
        </Page>
    );
};
