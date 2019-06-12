//react
import React, { Fragment } from 'react';
//router
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
//redux
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './redux/selectors';
import { loginUser, logoutUser } from './redux/actions/user';

export default function App() {

  const dispatch = useDispatch();

  const user = useSelector(getUser);

  const handleLogin = () => dispatch(loginUser('Bo9WaWSt65ariYM9ESI7'));
  const handleLogout = () => dispatch(logoutUser());

  console.log(user)
  return (
    <div>
      <Router>
        {user
          ? (
            <Fragment>
              <button onClick={handleLogout}>logout</button>
              {user.first_name}
            </Fragment>
          )
          : (
            <Fragment>
              <button onClick={handleLogin}>login</button>
            </Fragment>
          )}
      </Router>
    </div>
  );
};
