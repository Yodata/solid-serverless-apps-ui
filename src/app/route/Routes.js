import React, { useEffect } from 'react';
import Client from '../../views/Client';
import Admin from '../../views/Admin';
import Login from '../../views/Login';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import PrivateRoute from '../../components/Authentication/PrivateRoute';
import { useSelector, useDispatch } from 'react-redux'
import { setRoleName } from "../../redux/slices/roleSlice";

function Routes() {
  const state = useSelector(state => ({ id: state.auth.userId, userList: state.auth.userList }))
  const dispatch = useDispatch();
  let location = useLocation();
  let role = undefined
  // useEffect(() => {
  //   if (location?.search.includes('self')){
  //     role = 'self'
  //   }else if (location?.search.includes('team')){
  //     role = 'team'
  //   };
  //   dispatch(setRoleName(role));
  // }, [location, dispatch]);
  // console.log("Routes rendering - location:", location, "role:", role);
  return (
    <React.Fragment>
      <Switch>
        <PrivateRoute exact path="/" component={Client} />
        <Route path="/login" component={Login} />
        {state.userList.some(ele => ele.contactId === state.id) &&
          (<PrivateRoute exact path="/admin" component={Admin} />)
        }
        <Redirect from="*" to={{ pathname: "/", search: location.search }} />
      </Switch>
    </React.Fragment>
  );
};

export default Routes;