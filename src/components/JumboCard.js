//react
import React from 'react';
//router
import { } from "react-router-dom";
//redux
import { } from 'react-redux';
import { } from '../redux/selectors';
import { } from '../redux/actions';
//react-bootstrap
import Card from 'react-bootstrap/Card';

export default function JumboCard({ children, border = 'primary' }) {
    return (
        <Card border={border} className="mb-4 p-2">
            <Card.Body>
                {children}
            </Card.Body>
        </Card>
    );
}