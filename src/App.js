//react
import React, { useEffect } from 'react';
//router
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
//redux
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './redux/selectors';
import { fetchUser } from './redux/actions';
//pages
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage'; 
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
//components
import PageNavbar from './components/PageNavbar';
import InfoModal from './components/InfoModal';

export default function App() {

    const user = useSelector(getUser);

    const dispatch = useDispatch();
    useEffect(() => dispatch(fetchUser()), [dispatch]);

    return (
        <div>
            <Router>
                <InfoModal />
                {user &&
                    <PageNavbar />
                }
                <Switch>
                    {!user && <Route exact path="/" component={LoginPage} />}
                    {!user && <Route exact path="/signup" component={SignUpPage} />}
                    {user && <Route exact path="/" component={HomePage} />}
                    {user && <Route exact path="/profile" component={ProfilePage} />}
                    <Redirect from="/" to="/" />
                </Switch>
            </Router>
        </div>
    );
};
