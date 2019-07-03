//react
import React, { useEffect } from 'react';
//router
import { } from "react-router-dom";
//redux
import { useDispatch, useSelector } from 'react-redux';
import { getCourses, getUser } from '../redux/selectors';
import { fetchCourses, fetchLessons } from '../redux/actions';
//react-bootstrap
import ListGroup from 'react-bootstrap/ListGroup';
//components
import Page from '../components/Page';
import NotFoundPage from './NotFoundPage';
import JumboCard from '../components/JumboCard';

export default function ManagerMetricsPage() {

    const dispatch = useDispatch();
    
    const user = useSelector(getUser) || {};
    const courses = useSelector(getCourses) || {};
    
    //fetch ALL courses and lessons when view loads
    useEffect(() => { dispatch(fetchCourses(true)) }, [dispatch]);
    useEffect(() => { dispatch(fetchLessons()) }, [dispatch]);

    const courseItems = Object.keys(courses).map(courseId => {
        const course = courses[courseId];

        return (
            <ListGroup.Item key={courseId}>
                {`${course.title} - ${course.num_users_completed}/${course.num_users} users completed`}
            </ListGroup.Item>
        )
    })

    if (!user || !user.is_admin) return ( <NotFoundPage/>);

    return (
        <Page>
            <JumboCard>
                <h1>{`Administrator Metrics`}</h1>
            </JumboCard>
            <ListGroup>
                <ListGroup.Item className="list-group-header">Course Statistics</ListGroup.Item>
                {courseItems}
            </ListGroup>
        </Page>
    );
};