//react
import React from 'react';
//router
import { } from "react-router-dom";
//redux
import { } from 'react-redux';
import { } from '../redux/selectors';
import { } from '../redux/actions';
//react-bootstrap
import Jumbotron from 'react-bootstrap/Jumbotron';
//components
import Page from '../components/Page';
import ManageLessonsView from '../components/ManageLessonsView';

export default function LessonsPage() {

    return (
        <Page>
            <Jumbotron>
                <h2>Lessons</h2>
            </Jumbotron>
            <ManageLessonsView />
        </Page>
    );
};