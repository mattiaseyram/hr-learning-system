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
    const lesson = useSelector(getLesson) || {};

    console.log(course, lesson);

    useEffect(() => { dispatch(fetchCourse(params.courseId)) }, [dispatch, params.courseId]);
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
            <h2>Quizzes</h2>
            { quizzes }
        </Page>
    );
};
