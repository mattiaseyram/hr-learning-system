//react
import React from 'react';
//router
import { } from "react-router-dom";
//redux
import { } from 'react-redux';
import { } from '../redux/selectors';
import { } from '../redux/actions';
//components
import Page from '../components/Page';
import ManageCoursesView from '../components/ManageCoursesView';
import JumboCard from '../components/JumboCard';

export default function CoursesPage() {
    
    const title = 'Manage Courses';
    return (
        <Page title={title}>
            <JumboCard>
                <h1>{title}</h1>
            </JumboCard>
            <ManageCoursesView />
        </Page>
    );
};