//react
import React, { useEffect } from 'react';
//router
import { } from "react-router-dom";
//redux
import { useDispatch, useSelector } from 'react-redux';
import { getCourses, getLessons, getUsers } from '../redux/selectors';
import { fetchCourses, fetchLessons } from '../redux/actions';
//react-bootstrap
import ListGroup from 'react-bootstrap/ListGroup';
//components
import Page from '../components/Page';
import JumboCard from '../components/JumboCard';

export default function AdminMetricsPage() {

    const dispatch = useDispatch();
    
    const courses = useSelector(getCourses);
    const lessons = useSelector(getLessons);
    const users = useSelector(getUsers);

    console.log({courses, lessons, users});

    //fetch ALL courses and lessons when view loads
    useEffect(() => { dispatch(fetchCourses(true)) }, [dispatch]);
    useEffect(() => { dispatch(fetchLessons()) }, [dispatch]);


    var totalUsers = Object.keys(users).length;
    
    var numCompletedCourse = {};

    for(var userId in users) {

        var user = users[userId];

        for(var courseId in user.courses) {

            var course = user.courses[courseId];

            if(!(courseId in numCompletedCourse)) {
                numCompletedCourse[courseId] = 0;
            }

            if(course.complete) {
                numCompletedCourse[courseId] += 1;
            }

        }

    }

    const completedCourseList= Object.keys(courses).map((courseId, i) => {
        const course = courses[courseId];

        return (
            <ListGroup.Item key={courseId}>{course.title} - {" Completed: "} 
            {numCompletedCourse[courseId] || 0}</ListGroup.Item>
        );
    });


    return (
        <Page>
            <JumboCard>
                <h1>{`Administrator Metrics`}</h1>
                <p> Total Subordinates: {totalUsers} </p>
            </JumboCard>
            <ListGroup>
                <ListGroup.Item className="list-group-header">Course Completion</ListGroup.Item>
            </ListGroup>


            {completedCourseList}


        </Page>
    );
};