//react
import React, { useEffect } from 'react';
//router
import { } from "react-router-dom";
//redux
import { useDispatch, useSelector } from 'react-redux';
import { getCourse } from '../redux/selectors';
import { fetchCourse } from '../redux/actions';
//react-bootstrap
import Jumbotron from 'react-bootstrap/Jumbotron';

//components
import Page from '../components/Page';
import LessonsView from '../components/LessonsView';

export default function CoursePage({ match: { params } }) {

    const course = useSelector(getCourse) || {};

    const dispatch = useDispatch();

    useEffect(() => { dispatch(fetchCourse(params.courseId)) }, [dispatch, params.courseId]);
    return (
        <Page title={course.title}>
            <Jumbotron>
                {course.title}
            </Jumbotron>
            <LessonsView />
        </Page>
    );
};
