import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { currentUser } from '../../redux/actions/authenticationActions';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

    React.useEffect(() => {
      dispatch(currentUser());
    }, []);
    return (
        <Route {...rest} render={props => (
            isLoggedIn
                ? <Component {...props} />
                : <Redirect to={{ pathname: '/login' }} />
            // : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )} />
    )
}

export default PrivateRoute