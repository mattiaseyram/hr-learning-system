//react
import React, { useEffect } from 'react';
//router
import { } from "react-router-dom";
//redux
import { useDispatch, useSelector } from 'react-redux';
import { getLesson, getCourse } from '../redux/selectors';
import { fetchCourse, fetchLesson } from '../redux/actions';
//react-markdown
import ReactMarkdown from 'react-markdown';
//components
import Page from '../components/Page';
import JumboCard from '../components/JumboCard';

export default function LessonPage({ match: { params } }) {

    const dispatch = useDispatch();

    const course = useSelector(getCourse) || {};
    // storage of quiz answers
    const quiz_ans = []

    const lesson = useSelector(getLesson) || {};

    console.log(course, lesson);

    useEffect(() => { dispatch(fetchCourse(params.courseId)) }, [dispatch, params.courseId]);
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
    const quizzes = (lesson.questions ? lesson.questions.map((quiz, i) => {
        return (
            <div>
                <h4>{quiz.question}</h4>
                <Form onSubmit={handleSubmit}>
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
                    <input type="submit" value="Submit" />
                </Form>
            </div>
            )
    }) : null);

    return (
        <Page title={lesson.title}>
            <JumboCard>
                <h1>{lesson.title}</h1>
            </JumboCard>
            <JumboCard border="secondary">
                <ReactMarkdown source={lesson.content}/>
            </JumboCard>
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
