//react
import React from 'react';
//router
import { } from "react-router-dom";
//redux
import { useSelector } from 'react-redux';
import { getUser } from '../redux/selectors';
import { } from '../redux/actions';
//react-bootstrap
import { Jumbotron, Container } from 'react-bootstrap';
//components
import Page from '../components/Page';

export default function HomePage() {

    const user = useSelector(getUser);

    return (
        <Page>
            <Container>
                <Jumbotron>
                    <h2>Welcome to the HR Learning System</h2>
                    <p>{user.first_name}</p>
                </Jumbotron>
            </Container>
        </Page>
    );
};
