import React from 'react';
import { Route, Redirect } from 'react-router-dom';
const ProtectedRoute = ({ children, auth }) => {
    if (auth) {
        return <Route>{children}</Route>;
    } else {
        return <Redirect to="/auth" />;
    }
};

export default ProtectedRoute;
