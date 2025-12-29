import React from 'react';
import { Route, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { currentUser } from '../../redux/actions/authenticationActions';
import { getQueryParam, captureInitialQueryParams } from '../../utility';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    let location = useLocation();
    
    React.useEffect(() => {
      // Try to capture params again in case they appeared after initial load
      captureInitialQueryParams();
      // Use stored query parameter instead of location.search to handle Salesforce iframe URL rewriting
      // Only set role if parameter is available, otherwise leave it undefined
      const role = getQueryParam('runAs', location.search);
      if (role) {
        dispatch(currentUser(role));
      }
    }, [dispatch, location.search]);

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