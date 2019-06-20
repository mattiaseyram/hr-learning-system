//react
import React from 'react';
//router
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
//redux
import { useSelector } from 'react-redux';
import { getUser } from './redux/selectors';
import { } from './redux/actions';
//pages
import LoginPage from './pages/LoginPage';
import CreateUserPage from './pages/CreateUserPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
//components
import PageNavbar from './components/PageNavbar';
import InfoModal from './components/InfoModal';

export default function App() {

    const user = useSelector(getUser);

    return (
        <div>
            <Router>
                <InfoModal />
                {user &&
                    <PageNavbar />
                }
                <Switch>
                    {!user && <Route exact path="/" component={LoginPage} />}
                    {!user && <Route exact path="/signup" component={CreateUserPage} />}
                    {user && <Route exact path="/" component={HomePage} />}
                    {user && <Route exact path="/profile" component={ProfilePage} />}
                    <Redirect from="/" to="/" />
                </Switch>
            </Router>
        </div>
    );
};
