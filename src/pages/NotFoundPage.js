//react
import React from 'react';
//router
import { } from "react-router-dom";
//redux
import { } from 'react-redux';
import { } from '../redux/selectors';
import { } from '../redux/actions';
//react-bootstrap
import { Jumbotron } from 'react-bootstrap';
//components
import Page from '../components/Page';

export default function NotFoundPage() {

    return (
        <Page>
            <Jumbotron>
                <h2>Page not found.</h2>
            </Jumbotron>
        </Page>
    );
};
