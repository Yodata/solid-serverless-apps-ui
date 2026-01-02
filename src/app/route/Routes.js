import React, { useEffect , useRef} from 'react';
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

  // 🔍 capture-once logic (LOGGING ONLY)
  const runAsRef = useRef(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const runAsFromUrl = params.get('runAs');

    if (runAsRef.current === null && runAsFromUrl) {
      runAsRef.current = runAsFromUrl;
    }

    console.group('🧭 [Routes DEBUG]');
    console.log('pathname:', location.pathname);
    console.log('search:', location.search);
    console.log('runAs from URL:', runAsFromUrl);
    console.log('runAs stored in ref:', runAsRef.current);
    console.log('auth snapshot:', state.auth);
    console.groupEnd();
  }, [location.pathname, location.search, state.auth]);

  useEffect(() => {
    dispatch(setRoleName(location.search?.split("=")[1]));
  }, []);
  console.log("Current Role in Routes:", location.search?.split("=")[1]);
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