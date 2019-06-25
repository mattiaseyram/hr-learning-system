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
import JumboCard from '../components/JumboCard';

export default function NotFoundPage() {

    return (
        <Page>
            <JumboCard>
                <h1>Page not found.</h1>
            </JumboCard>
        </Page>
    );
};
