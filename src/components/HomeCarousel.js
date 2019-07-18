//react
import React, { } from 'react';
//router
import { } from "react-router-dom";
//redux
import { } from 'react-redux';
import { } from '../redux/selectors';
import { } from '../redux/actions';
//react-bootstrap
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';

export default function HomeCarousel() {

    return (
        <div className="d-flex justify-content-center m-4">
            <Card>
                <Card.Body>
                    <Carousel>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="https://www.worldatlas.com/r/w480/img/flag/ca-flag.jpg"
                                alt="First slide"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="https://res.cloudinary.com/fen-learning/image/upload/c_limit,w_510,h_382/infopls_images/images/mapcanada.gif"
                                alt="Second slide"
                            />
                        </Carousel.Item>

                    </Carousel>
                </Card.Body>
            </Card>
        </div>
    );
};

