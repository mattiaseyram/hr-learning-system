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
import ManageCoursesView from '../components/ManageCoursesView';

export default function CoursesPage() {

    return (
        <Page>
            <Jumbotron>
                <h2>Courses</h2>
            </Jumbotron>
            <ManageCoursesView />
        </Page>
    );
};