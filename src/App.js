//react
import React, { Fragment } from 'react';
//router
import { BrowserRouter as Router, Route } from "react-router-dom";
//redux
import { useSelector } from 'react-redux';
import { getUser } from './redux/selectors';
import { } from './redux/actions';
//pages
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
//components
import PageNavbar from './components/PageNavbar';

export default function App() {

    const user = useSelector(getUser);

    return (
        <div>
            <Router>
                {user &&
                    <PageNavbar />
                }
                {!user
                    ? (
                        <Fragment>
                            <Route path="/" component={LoginPage} />
                        </Fragment>
                    )
                    : (
                        <Fragment>
                            <Route path="/" component={HomePage} />
                        </Fragment>
                    )
                }
            </Router>
        </div>
    );
};
