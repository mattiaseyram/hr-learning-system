//react
import React, { Fragment } from 'react';
//redux
import { useSelector } from 'react-redux';
import { getUser } from './redux/selectors';
import { retrieveUser } from './redux/actions/user';

export default function App() {

  const user = useSelector(state => state.counter);

  retrieveUser('Bo9WaWSt65ariYM9ESI7');

  return (
    <div>
      hehehe
    </div>
  );
};
