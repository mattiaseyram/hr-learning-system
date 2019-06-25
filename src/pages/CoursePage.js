//react
import React, { useEffect } from 'react';
//router
import { } from "react-router-dom";
//redux
import { useDispatch, useSelector } from 'react-redux';
import { getCourse } from '../redux/selectors';
import { fetchCourse } from '../redux/actions';
//components
import Page from '../components/Page';
import LessonsView from '../components/LessonsView';
import JumboCard from '../components/JumboCard';

export default function CoursePage({ match: { params } }) {

    const course = useSelector(getCourse) || {};

    const dispatch = useDispatch();

    useEffect(() => { dispatch(fetchCourse(params.courseId)) }, [dispatch, params.courseId]);
    return (
        <Page title={course.title}>
            <JumboCard>
                <h1>{course.title}</h1>
            </JumboCard>
            <LessonsView />
        </Page>
    );
};
