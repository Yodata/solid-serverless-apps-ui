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

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const runAsFromUrl = params.get('runAs');

    if (
      runAsFromUrl !== null &&
      sessionStorage.getItem('runAs') === null
    ) {
      sessionStorage.setItem('runAs', runAsFromUrl);
      console.log('[Routes] captured runAs:', runAsFromUrl);
    }

    if (
      runAsFromUrl === null &&
      sessionStorage.getItem('runAs') === null
    ) {
      console.log('[Routes] runAs is undefined (no param provided)');
    }
  }, [location.search]);

  /**
   * STEP 2: Use ONLY the stable value for Redux
   */
  useEffect(() => {
    const stableRunAs = sessionStorage.getItem('runAs'); // string | null
    console.log('[Routes] setting role from stable runAs:', stableRunAs);
    dispatch(setRoleName(stableRunAs));
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