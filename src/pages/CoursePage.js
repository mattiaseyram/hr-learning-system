//react
import React, { useEffect } from 'react';
//router
import { } from "react-router-dom";
//redux
import { useDispatch, useSelector } from 'react-redux';
import { getCourse } from '../redux/selectors';
import { fetchCourse } from '../redux/actions';
//react-bootstrap
//components
import Page from '../components/Page';

export default function CoursePage({ match: { params } }) {

    const course = useSelector(getCourse);

    const dispatch = useDispatch();
    useEffect(() => dispatch(fetchCourse(params.courseId)), [ dispatch, params.courseId ]);

    return (
        <Page title={course.title}>
            {course.title}
        </Page>
    );
};
