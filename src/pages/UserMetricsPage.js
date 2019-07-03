//react
import React, { Fragment, useEffect } from 'react';
//router
import { } from "react-router-dom";
//redux
import { useDispatch, useSelector } from 'react-redux';
import { getCourses, getLessons, getUser } from '../redux/selectors';
import { fetchCourses, fetchLessons } from '../redux/actions';
//react-bootstrap
import ListGroup from 'react-bootstrap/ListGroup';

//components
import Page from '../components/Page';
import JumboCard from '../components/JumboCard';


export default function UserMetricsPage() {

    const dispatch = useDispatch();

    const user = useSelector(getUser);
    const courses = useSelector(getCourses);
    const lessons = useSelector(getLessons);

    const name = user ? user.first_name : 'anonymous';

    //fetch user's courses and lessons when view loads
    useEffect(() => { dispatch(fetchCourses()) }, [dispatch]);
    useEffect(() => { dispatch(fetchLessons()) }, [dispatch]);

    const average = Object.keys(courses).reduce((average, courseId) => {
        let complete = false;
        try {
            complete = user.courses[courseId].complete;
        } catch (err) { }
        if (complete) {
            const lessonAverage = Object.keys(lessons).reduce((lessonAverage, lessonId) => {
                try {
                    if (user.courses[courseId].lessons[lessonId].complete) {
                        const lesson = user.courses[courseId].lessons[lessonId];
                        return lessonAverage + (lesson.score / lesson.total);
                    }
                    else {
                        return lessonAverage;
                    }
                } catch (err) {
                    return lessonAverage;
                }
            }, 0);
            return average + (lessonAverage * 100);

        } else {
            return average;
        }

    }, 0);

    const courseItems = Object.keys(courses).map((courseId, i) => {
        const course = courses[courseId];
        let complete = false;
        try {
            complete = user.courses[courseId].complete;
        } catch (err) { }

        if (complete) {
            const courseScore = Object.keys(lessons).reduce((sum, lessonId) => {
                try {
                    const lesson = user.courses[courseId].lessons[lessonId]
                    return sum + ((lesson.score / lesson.total) * 100);
                } catch (err) {
                    return sum;
                }
            }, 0);
            return (
                <ListGroup.Item key={i}>{course.title} - {courseScore}{"%"}
                </ListGroup.Item>
            );
        } else {
            return <Fragment key={i}/>;
        }
    });

    return (
        <Page>
            <JumboCard>
                <h1>{name}{`'s Metrics`}</h1>
                <p>{'Your average course score is '}{average}{'%!'}</p>
            </JumboCard>
            <ListGroup>
                <ListGroup.Item className="list-group-header">Course Scores</ListGroup.Item>
                {courseItems}
            </ListGroup>
        </Page>
    );
};