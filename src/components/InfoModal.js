//react
import React, { Fragment } from 'react';
//router
import { } from "react-router-dom";
//redux
import { useDispatch, useSelector } from 'react-redux';
import { getLoading, getWarning } from '../redux/selectors';
import { setLoading, setWarning } from '../redux/actions';
//react-bootstrap
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

export default function LoadingModal() {

    const dispatch = useDispatch();

    const loading = useSelector(getLoading);
    const warning = useSelector(getWarning);

    const show = Boolean(loading || warning);
    const closeModal = () => loading ? dispatch(setLoading()) : dispatch(setWarning());

    return (
        <Fragment>
            <Modal size="sm" centered show={show} onHide={closeModal}>
                <Modal.Body>
                    {
                        loading
                        ? (
                            <Spinner animation="border" variant="primary" />
                        )
                        : (
                            <p>{warning}</p>
                        )
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={closeModal}>Close</Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    );
};
