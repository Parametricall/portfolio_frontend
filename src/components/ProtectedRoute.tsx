import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUserAuthenticated } from '../reduxStore/actions';

async function ProtectedRoute(props) {
    const {
        children, path,
    } = props;

    const authenticated = localStorage.getItem('user');

    return (
        <Route
            path={path}
            render={() => (authenticated ? children : <Redirect to="/login" />)}
        />
    );
}

function mapStateToProps() {
    // Leaving here as example for future, but does not actually do anything
    const authenticated = localStorage.getItem('user');
    return {
        authenticated,
    };
}

export default connect(mapStateToProps, { setUserAuthenticated })(
    // @ts-ignore
    ProtectedRoute,
);
