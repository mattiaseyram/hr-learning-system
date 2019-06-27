//react
import React, { useEffect } from 'react';
//router
import { } from "react-router-dom";
//redux
import { useDispatch, useSelector } from 'react-redux';
import { getCourses, getLessons } from '../redux/selectors';
import { fetchCourses, fetchLessons } from '../redux/actions';
//components
import Page from '../components/Page';
import JumboCard from '../components/JumboCard';

export default function ManagerMetricsPage() {

    const dispatch = useDispatch();
    
    const courses = useSelector(getCourses);
    const lessons = useSelector(getLessons);

    console.log({courses, lessons});
    
    //fetch ALL courses and lessons when view loads
    useEffect(() => { dispatch(fetchCourses(true)) }, [dispatch]);
    useEffect(() => { dispatch(fetchLessons()) }, [dispatch]);

    return (
        <Page>
            <JumboCard>
                <h1>{`Manager Metrics`}</h1>
            </JumboCard>
        </Page>
    );
};