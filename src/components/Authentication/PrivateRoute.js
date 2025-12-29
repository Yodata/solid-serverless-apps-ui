import React from 'react';
import { Route, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { currentUser } from '../../redux/actions/authenticationActions';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    let location = useLocation();
    console.log("location in PrivateRoute:", location);
    let role = "";
    if(location.search?.split("=")[1].includes("self")) {;
        role = "self";
    } else if(location.search?.split("=")[1].includes("team")) {
        role = "team";
    } else {
         role =location.search?.split("=")[1]
    }

    React.useEffect(() => {
      dispatch(currentUser(role));
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