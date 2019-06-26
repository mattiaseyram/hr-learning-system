//react
import React, { Fragment, useEffect } from 'react';
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
import LessonQuiz from '../components/LessonQuiz';

export default function LessonPage({ match: { params } }) {

    const dispatch = useDispatch();

    const course = useSelector(getCourse) || {};
    const lesson = useSelector(getLesson) || {};

    useEffect(() => { dispatch(fetchCourse(params.courseId)) }, [dispatch, params.courseId]);
    useEffect(() => { dispatch(fetchLesson(params.lessonId)) }, [dispatch, params.lessonId]);

    return (
        <Page title={lesson.title}>
            <JumboCard>
                <h1>{lesson.title}</h1>
                <h6>{course.title}</h6>
            </JumboCard>
            <JumboCard border="secondary">
                <ReactMarkdown source={lesson.content}/>
            </JumboCard>
            {lesson.questions && lesson.questions.length ? <LessonQuiz/> : <Fragment/>}
        </Page>
    );
};
