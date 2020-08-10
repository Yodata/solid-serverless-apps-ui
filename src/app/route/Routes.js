import React from 'react';
import Client from '../../views/Client';
import Admin from '../../views/Admin';
import Login from '../../views/Login';
import { Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoute from '../../components/Authentication/PrivateRoute';
import { useSelector } from 'react-redux'

function Routes() {
    const state = useSelector(state => ({ id: state.auth.userId, userList: state.auth.userList }))
    return (
        <React.Fragment>
            <Switch>
                <PrivateRoute exact path="/" component={Client} />
                <Route path="/login" component={Login} />
                {state.userList.some(ele => ele.contactId === state.id) &&
                    (<PrivateRoute exact path="/admin" component={Admin} />)
                }
                <Redirect from="*" to="/" />
            </Switch>
        </React.Fragment>
    );
};

export default Routes;