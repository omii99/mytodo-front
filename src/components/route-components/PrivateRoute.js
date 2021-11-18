import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {isSession} from "../../session/Session";


const PrivateRoute = ({component: Component, ...rest}) => {
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            isSession() ?
                <Component {...props} />
                : <Redirect to="/auth/login" />
        )} />
    );
};

export default PrivateRoute;