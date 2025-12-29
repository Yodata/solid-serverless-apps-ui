import React from 'react';
import { Route, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { currentUser } from '../../redux/actions/authenticationActions';
import { getQueryParam } from '../../utility';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    let location = useLocation();
    // Use stored query parameter instead of location.search to handle Salesforce iframe URL rewriting
    const role = getQueryParam('runAs', location.search);

    React.useEffect(() => {
      dispatch(currentUser(role));
    }, [dispatch, role]);

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