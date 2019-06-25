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
import ManageLessonsView from '../components/ManageLessonsView';
import JumboCard from '../components/JumboCard';

export default function LessonsPage() {

    const title = 'Manage Lessons';
    return (
        <Page title={title}>
            <JumboCard>
                <h1>{title}</h1>
            </JumboCard>
            <ManageLessonsView />
        </Page>
    );
};