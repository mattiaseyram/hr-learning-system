//react
import React, { Fragment, useEffect } from 'react';
//router
import { } from "react-router-dom";
//redux
import { useDispatch } from 'react-redux';
import { } from '../redux/selectors';
import { setTitle } from '../redux/actions';
//react-bootstrap
import { Container } from 'react-bootstrap';

export default function Page({ title, children }) {

    const dispatch = useDispatch();
    useEffect(() => { dispatch(setTitle(title)) }, [title, dispatch]);

    return (
        <Fragment>
            <Container>
                {children}
            </Container>
        </Fragment>
    );
};
