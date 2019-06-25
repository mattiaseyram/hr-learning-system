//react
import React from 'react';
//router
import { } from "react-router-dom";
//redux
import { useSelector } from 'react-redux';
import { getUser } from '../redux/selectors';
import { } from '../redux/actions';
//components
import Page from '../components/Page';
import CoursesView from '../components/CoursesView';
import JumboCard from '../components/JumboCard';

export default function HomePage() {

    const user = useSelector(getUser);

    return (
        <Page>
            <JumboCard>
                <h1>{`Welcome to the HR Learning System, ${user ? user.first_name : 'anonymous'}.`}</h1>
            </JumboCard>
            <CoursesView />
        </Page>
    );
};