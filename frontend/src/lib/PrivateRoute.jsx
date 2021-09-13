import React from 'react';
import { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import isLogin from '../lib/isLogin';



const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
      // Show the component only when the user is logged in
      // Otherwise, redirect the user to /login page
        <Route
            {...rest}
            render={(props) => (isLogin() ? <Component {...props} /> : <Redirect to="/account/login" />)}
        />
    );
};

export default PrivateRoute;