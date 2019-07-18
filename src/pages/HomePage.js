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
import HomeCarousel from '../components/HomeCarousel';

export default function HomePage() {

    const user = useSelector(getUser);

    const name = user ? user.first_name : 'anonymous';

    return (
        <Page>
            <JumboCard>
                <h1>
                    {`Welcome to the HR Learning System, `}
                    <span style={{ color: 'var(--gray)' }}>{`${name}.`}</span>
                </h1>
            </JumboCard>
            <CoursesView />
            <HomeCarousel/>
        </Page>
    );
};