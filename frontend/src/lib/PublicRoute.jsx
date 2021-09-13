import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import isLogin from './isLogin';

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  console.log(restricted);
  return (
    <Route
      {...rest}
      render={(props) => (isLogin() && restricted ? <Redirect to="/main" /> : <Component {...props} />)}
    />
  );
};
export default PublicRoute;