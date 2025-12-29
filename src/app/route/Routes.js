import React, { useEffect } from 'react';
import Client from '../../views/Client';
import Admin from '../../views/Admin';
import Login from '../../views/Login';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import PrivateRoute from '../../components/Authentication/PrivateRoute';
import { useSelector, useDispatch } from 'react-redux'
import { setRoleName } from "../../redux/slices/roleSlice";
import { currentUser } from "../../redux/actions/authenticationActions";

function Routes() {
  const state = useSelector(state => ({ id: state.auth.userId, userList: state.auth.userList }))
  const dispatch = useDispatch();
  let location = useLocation();
  useEffect(() => {
    let role = null;
    try {
        const referrerUrl = new URL(document.referrer);
        const referrerParams = new URLSearchParams(referrerUrl.search);
        role = referrerParams.get('runAs');
    } catch (e) {
        // Fallback
        role = null;
    }
    dispatch(currentUser(role));
  }, [dispatch]);

  // PostMessage listener for role from Salesforce parent
  useEffect(() => {
    const handler = (event) => {
      if (event.origin.includes("bhhsresource.com")) {
        dispatch(setRoleName(event.data.runAs));
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [dispatch]);
  return (
    <React.Fragment>
      <Switch>
        <PrivateRoute exact path="/" component={Client} />
        <Route path="/login" component={Login} />
        {state.userList.some(ele => ele.contactId === state.id) &&
          (<PrivateRoute exact path="/admin" component={Admin} />)
        }
        <Redirect from="*" to="/" />
      </Switch>
    </React.Fragment>
  );
};

export default Routes;