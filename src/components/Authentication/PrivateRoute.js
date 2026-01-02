import React from "react";
import { Route, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { currentUser } from "../../redux/actions/authenticationActions";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  let location = useLocation();
  const role = location.search?.split("=")[1];
  console.log("PrivateRoute location", location, "role:", role);
  console.log("isLoggedIn in PrivateRoute:", isLoggedIn);
  React.useEffect(() => {
    dispatch(currentUser(role));
  }, []);

  const param = sessionStorage.getItem("role");
  console.log("PrivateRoute sessionStorage role param:", param);
  React.useEffect(() => {
    if (param !== undefined) {
      dispatch(currentUser(role));
    }
    setTimeout(() => {
      sessionStorage.removeItem("role");
    }, 3000);
  }, [param]);
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
