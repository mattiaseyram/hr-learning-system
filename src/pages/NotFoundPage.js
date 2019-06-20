//react
import React, { Fragment } from 'react';
//router
import { } from "react-router-dom";
//redux
import { } from 'react-redux';
import { } from '../redux/selectors';
import { } from '../redux/actions';
//react-bootstrap
import { Jumbotron, Container } from 'react-bootstrap';

export default function NotFoundPage() {

    return (
        <Fragment>
            <Container>
                <Jumbotron>
                    <h2>Page not found.</h2>
                </Jumbotron>
            </Container>
        </Fragment>
    );
};
