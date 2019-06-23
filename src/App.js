//react
import React, { useEffect } from 'react';
//router
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//redux
import { useDispatch, useSelector } from 'react-redux';
import { getUser, getTitle } from './redux/selectors';
import { fetchUser } from './redux/actions';
//helmet
import Helmet from 'react-helmet';
//pages
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import CreateCoursePage from './pages/CreateCoursePage';
import DataLoadPage from './pages/DataLoadPage';
//components
import PageNavbar from './components/PageNavbar';
import InfoModal from './components/InfoModal';

export default function App() {

    const pageTitle = useSelector(getTitle);
    const user = useSelector(getUser);

    const dispatch = useDispatch();
    useEffect(() => dispatch(fetchUser()), [dispatch]);

    return (
        <div>
            <Helmet>
                <title>{pageTitle}</title>
            </Helmet>
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
                    {user && <Route exact path="/createcourse" component={CreateCoursePage} />}
                    {user && <Route exact path="/editcourse/:id" component={CreateCoursePage} />}
                    {user && <Route exact path="/dataload" component={DataLoadPage} />}
                </Switch>
            </Router>
        </div>
    );
};