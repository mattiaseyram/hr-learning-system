//react
import React, { useEffect } from 'react';
//router
import { } from "react-router-dom";
//redux
import { useDispatch, useSelector } from 'react-redux';
import { getLesson } from '../redux/selectors';
import { fetchLesson } from '../redux/actions';
//react-markdown
import ReactMarkdown from 'react-markdown';
//components
import Page from '../components/Page';
import JumboCard from '../components/JumboCard';

export default function LessonPage({ match: { params } }) {

    const lesson = useSelector(getLesson) || {};

    const dispatch = useDispatch();

    useEffect(() => { dispatch(fetchLesson(params.lessonId)) }, [dispatch, params.lessonId]);

    return (
        <Page title={lesson.title}>
            <JumboCard>
                <h1>{lesson.title}</h1>
            </JumboCard>
            <div className="lesson-content-view">
                <ReactMarkdown source={lesson.content}/>
            </div>
        </Page>
    );
};
