//react
import React, { Fragment, useState, useEffect } from 'react';
//router
import { } from 'react-router-dom';
//redux
import { } from 'react-redux';
import { } from '../redux/selectors';
import { } from '../redux/actions';
//react-bootstrap
import Form from 'react-bootstrap/Form';

export default function ArrayStringFormGroup({arrayInput = [], setArrayInput, label = '', placeholder = ''}) {

    const [stringInput, setStringInput] = useState('');

    useEffect(() => { 
        setStringInput( arrayInput.join(', ') );
     }, [arrayInput]);

    useEffect(() => {

        const cleansedStringInput = stringInput.trim();
        let arrayOutput = [];
        if (cleansedStringInput) {        
            arrayOutput = cleansedStringInput.split(',').map(item => item.trim()).filter(item => item);
        } 
        
        setArrayInput(arrayOutput);
        
     }, [setArrayInput, stringInput]);

    return (
        <Fragment>
            <Form.Group>
                <Form.Label>{label}</Form.Label>
                <Form.Control type="text"
                    placeholder={placeholder}
                    value={stringInput}
                    onChange={event => setStringInput(event.target.value)} />
            </Form.Group>
        </Fragment>
    );
};
