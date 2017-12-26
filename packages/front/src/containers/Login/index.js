import React from 'react';
import connector from './connector';

import Login from '../../components/Login';

const LoginContainer = ({ saveToken, history }) => (
  <Login
    onSubmit={(token) => {
      saveToken(token);
      history.push('/prices');
    }}
  />
);

export default connector(LoginContainer);
