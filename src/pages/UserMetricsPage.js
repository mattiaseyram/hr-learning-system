//react
import React, { useEffect } from 'react';
//router
import {Link } from "react-router-dom";
//redux
import { useDispatch, useSelector } from 'react-redux';
import { getCourses, getLessons, getUser } from '../redux/selectors';
import { fetchCourses, fetchLessons } from '../redux/actions';
//react-bootstrap
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import ListGroup from 'react-bootstrap/ListGroup';
//components
import Page from '../components/Page';
import JumboCard from '../components/JumboCard';



export default function UserMetricsPage() {

    const dispatch = useDispatch();
    
    const courses = useSelector(getCourses);
    const lessons = useSelector(getLessons);
    const user = useSelector(getUser);

    const name = user ? user.first_name : 'anonymous';

    console.log({courses, lessons});
    
    //fetch user's courses and lessons when view loads
    useEffect(() => { dispatch(fetchCourses()) }, [dispatch]);
    useEffect(() => { dispatch(fetchLessons()) }, [dispatch]);

    const courseItems = Object.keys(courses).map((courseId, i) => {

        const course = courses[courseId];
        const scoreLessons = Object.keys(course.lessons).reduce((total, lessonId) => {
            const lesson=course.lessons[lessonId];
            console.log(lesson);
            return total + lesson.score;
        }, {score:0});

        const totalCourse =Object.keys(course.lessons).reduce((total, lessonId) => {
            const lesson=course.lessons[lessonId];
            return total + lesson.total;
        }, {score:0});

        const courseScore=scoreLessons / totalCourse;

        return (
            <ListGroup.Item>{course.title} {courseScore}
            </ListGroup.Item>
        );
    });

    return (
        <Page>
            <JumboCard>
                <h1>{name}{`'s Metrics`}</h1>
            </JumboCard>
            <ListGroup>
                <ListGroup.Item className="list-group-header">Courses</ListGroup.Item>
                {courseItems}
            </ListGroup>
        </Page>
    );
};