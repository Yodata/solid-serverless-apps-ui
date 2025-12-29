import React from 'react';
import { Route, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { currentUser } from '../../redux/actions/authenticationActions';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    let location = useLocation();
    const role = location.search?.split("=")[1]

    React.useEffect(() => {
        if(role?.includes("self")){
            dispatch(currentUser("self"));
        };
        if(role?.includes("team")){
            dispatch(currentUser("team"));
        }
    }, []);

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