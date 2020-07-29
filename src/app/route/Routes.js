import React from 'react';
import Client from '../../views/Client';
import Admin from '../../views/Admin';
import Login from '../../views/Login';
import { Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoute from '../../components/Authentication/PrivateRoute';

function Routes() {
    return (
        <React.Fragment>
            <Switch>
                <PrivateRoute exact path="/" component={Client} />
                <Route path="/login" component={Login} />
                <PrivateRoute path="/admin" component={Admin} />
                <Redirect from="*" to="/" />
            </Switch>
        </React.Fragment>
    );
};

export default Routes;