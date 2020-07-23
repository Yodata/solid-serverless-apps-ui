import React from 'react';
import { Route } from 'react-router-dom';
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
            isLoggedIn &&
                <Component {...props} />
        )} />
    )
}

export default PrivateRoute