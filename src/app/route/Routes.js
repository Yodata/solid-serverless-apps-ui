import React, { useEffect, useRef } from 'react';
import Client from '../../views/Client';
import Admin from '../../views/Admin';
import Login from '../../views/Login';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import PrivateRoute from '../../components/Authentication/PrivateRoute';
import { useSelector, useDispatch } from 'react-redux';
import { setRoleName } from "../../redux/slices/roleSlice";

function Routes() {
  const state = useSelector(state => ({
    id: state.auth.userId,
    userList: state.auth.userList
  }));

  const dispatch = useDispatch();
  const location = useLocation();

  // 🔐 ensure init logic runs ONCE per page load
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    const params = new URLSearchParams(location.search);
    const runAsFromUrl = params.get('runAs');

    if (runAsFromUrl !== null) {
      // ✅ param explicitly provided → persist it
      sessionStorage.setItem('runAs', runAsFromUrl);
      console.log('[Routes] runAs captured from URL:', runAsFromUrl);
    } else {
      // ✅ param NOT provided → ensure clean state
      sessionStorage.removeItem('runAs');
      console.log('[Routes] runAs undefined → cleared sessionStorage');
    }

    const stableRunAs = sessionStorage.getItem('runAs'); // string | null
    console.log('[Routes] setting role from stable runAs:', stableRunAs);

    dispatch(setRoleName(stableRunAs));
  }, [location.search, dispatch]);

  return (
    <React.Fragment>
      <Switch>
        <PrivateRoute exact path="/" component={Client} />
        <Route path="/login" component={Login} />
        {state.userList.some(ele => ele.contactId === state.id) && (
          <PrivateRoute exact path="/admin" component={Admin} />
        )}
        <Redirect from="*" to="/" />
      </Switch>
    </React.Fragment>
  );
}

export default Routes;
