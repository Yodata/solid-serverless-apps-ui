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
// ✅ ALWAYS bootstrap auth once
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const runAs = params.get("runAs");

    if (runAs === "self" || runAs === "team") {
      sessionStorage.setItem("runAs", runAs);
      dispatch(setRoleName(runAs));
      dispatch(currentUser(runAs));
    } else {
      sessionStorage.removeItem("runAs");
      dispatch(setRoleName(null));
      dispatch(currentUser());
    }
  }, [dispatch]);

  // ✅ OPTIONAL listener (harmless if Salesforce never sends messages)
  useEffect(() => {
    const handler = (event) => {
      if (!event.origin.includes("bhhsresource.com")) return;

      if (event.data?.clearRunAs) {
        sessionStorage.removeItem("runAs");
        dispatch(setRoleName(null));
        dispatch(currentUser());
      }

      if (event.data?.runAs === "self" || event.data?.runAs === "team") {
        sessionStorage.setItem("runAs", event.data.runAs);
        dispatch(setRoleName(event.data.runAs));
        dispatch(currentUser(event.data.runAs));
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
        {state.userList.some((ele) => ele.contactId === state.id) && (
          <PrivateRoute exact path="/admin" component={Admin} />
        )}
        <Redirect from="*" to="/" />
      </Switch>
    </React.Fragment>
  );
}

export default Routes;
