import React from 'react';
import { Route, useLocation, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { currentUser } from '../../redux/actions/authenticationActions';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const [searchParams] = useSearchParams();
     const runAs = searchParams.get("runAs");
     console.log("PrivateRoute runAs", runAs);
    let location = useLocation();
    const role = location.search?.split("=")[1]
    console.log("PrivateRoute location", location);
    console.log("PrivateRoute role", role);
    React.useEffect(() => {
      setTimeout(() => {
        dispatch(currentUser(role));
      }, 1000);
    }, [location]);

    return (
        // <Route {...rest} render={props => (
        //     isLoggedIn
        //         ? <Component {...props} />
        //         : <Redirect to={{ pathname: '/login' }} />
        // )} />
        <Route {...rest} render={props => (
            isLoggedIn &&
                <Component {...props} />
        )} />
    )
}

export default PrivateRoute