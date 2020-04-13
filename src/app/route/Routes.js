import React from 'react';
import Client from '../../views/Client';
import Admin from '../../views/Admin';
import Login from '../../views/Login';
import { Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoute from '../../components/Authentication/PrivateRoute';

// const routes = [
//     {
//         path: "/",
//         component: Client
//     },
//     {
//         path: "/Admin",
//         component: Admin,
//     },
//     {
//         path: "/Login",
//         component: Login
//     }
// ];

function Routes() {
    return (
        <React.Fragment>
            <Switch>
                <PrivateRoute exact path="/" component={Client} />
                <Route path="/login" component={Login} />
                <Route path="/admin" component={Admin} />
                <Redirect from="*" to="/" />
            </Switch>
            {/* routes.map(({ path, component }, index) => {
                        
                        return (
                            <Route path={path}
                                component={component}
                                key={index}
                                exact
                            />
                        );
                    })
                I
            </Switch> */}
        </React.Fragment>
    );
};

export default Routes;