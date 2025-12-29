import React from "react";
import { Route, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { currentUser } from "../../redux/actions/authenticationActions";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  let location = useLocation();
  console.log(
    "PrivateRoute rendering - isLoggedIn:",
    isLoggedIn,
    "location",
    location
  );
  let role = null;
  if (location.search?.includes("/self")) role = "self";
  else if (location.search?.includes("/team")) role = "team";
  console.log("PrivateRoute role from URL:", role);

  React.useEffect(() => {
    dispatch(currentUser(role));
  }, [role]);

  return (
    // <Route {...rest} render={props => (
    //     isLoggedIn
    //         ? <Component {...props} />
    //         : <Redirect to={{ pathname: '/login' }} />
    // )} />
    <Route
      {...rest}
      render={(props) => isLoggedIn && <Component {...props} />}
    />
  );
};

export default PrivateRoute;
