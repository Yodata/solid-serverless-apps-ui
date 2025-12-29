import React, { useEffect } from "react";
import Client from "../../views/Client";
import Admin from "../../views/Admin";
import Login from "../../views/Login";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import PrivateRoute from "../../components/Authentication/PrivateRoute";
import { useSelector, useDispatch } from "react-redux";
import { setRoleName } from "../../redux/slices/roleSlice";
import { currentUser } from "../../redux/actions/authenticationActions";

function Routes() {
  const state = useSelector((state) => ({
    id: state.auth.userId,
    userList: state.auth.userList,
  }));
  const dispatch = useDispatch();
  let location = useLocation();
  console.log("location in Routes:", location);
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const runAsFromUrl = params.get("runAs");
    const isEmbedded = window.self !== window.top;

    let runAs = null;

    if (runAsFromUrl === "self" || runAsFromUrl === "team") {
      // Explicit override
      runAs = runAsFromUrl;
      sessionStorage.setItem("runAs", runAs);
    } else if (isEmbedded) {
      // iframe rewrite → reuse
      runAs = sessionStorage.getItem("runAs");
    } else {
      // clean top-level entry → clear
      sessionStorage.removeItem("runAs");
      runAs = null;
    }

    dispatch(setRoleName(runAs));
    dispatch(currentUser(runAs));
  }, [dispatch, location.search]);

  return (
    <React.Fragment>
      <Switch>
        <PrivateRoute exact path="/" component={Client} />
        <Route path="/login" component={Login} />
        {state.userList.some((ele) => ele.contactId === state.id) && (
          <PrivateRoute exact path="/admin" component={Admin} />
        )}
        <Redirect from="*" to="/" />
      </Switch>
    </React.Fragment>
  );
}

export default Routes;
