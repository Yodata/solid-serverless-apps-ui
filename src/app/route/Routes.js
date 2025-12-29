import React, { useEffect } from 'react';
import Client from '../../views/Client';
import Admin from '../../views/Admin';
import Login from '../../views/Login';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import PrivateRoute from '../../components/Authentication/PrivateRoute';
import { useSelector, useDispatch } from 'react-redux'
import { setRoleName } from "../../redux/slices/roleSlice";
import { getQueryParam, captureInitialQueryParams } from '../../utility';

function Routes() {
  const state = useSelector(state => ({ id: state.auth.userId, userList: state.auth.userList }))
  const dispatch = useDispatch();
  let location = useLocation();
  useEffect(() => {
    // Try to capture params again in case they appeared after initial load
    captureInitialQueryParams();
    // Use stored query parameter instead of location.search to handle Salesforce iframe URL rewriting
    // Only set role if parameter is available, otherwise leave it undefined
    const runAs = getQueryParam('runAs', location.search);
    if (runAs) {
      dispatch(setRoleName(runAs));
    }
  }, [dispatch, location.search]);
  return (
    <React.Fragment>
      <Switch>
        <PrivateRoute exact path="/" component={Client} />
        <Route path="/login" component={Login} />
        {state.userList.some(ele => ele.contactId === state.id) &&
          (<PrivateRoute exact path="/admin" component={Admin} />)
        }
        {/* Add new routes above this line */}
        <Redirect from="*" to="/" />
      </Switch>
    </React.Fragment>
  );
};

export default Routes;