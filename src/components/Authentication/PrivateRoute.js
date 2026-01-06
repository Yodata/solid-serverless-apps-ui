import React from "react";
import { Route, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { currentUser } from "../../redux/actions/authenticationActions";
import { ContactPhone } from "@material-ui/icons";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  let location = useLocation();
  const role = location.search?.split("=")[1];
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    dispatch(currentUser(role));
  }, []);
  const param = sessionStorage.getItem("role");
  React.useEffect(() => {
    setCount((prevCount) => prevCount + 1);
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
