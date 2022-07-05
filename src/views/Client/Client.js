import React, { useEffect } from "react";
import { HeroUser } from "../../components/Hero";
// import Group from '../../components/Groups';
import AppCard from "../../components/AppCard";
import Paper from "@material-ui/core/Paper";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setRoleName } from "../../redux/slices/roleSlice";

/**
 * @Component Client
 * @Description This component is the client's view.
 */

function Client() {
  let location = useLocation();
  const dispatch = useDispatch();
  console.log({ client: location.search })
  useEffect(() => {
    dispatch(setRoleName(location.search?.split("=")[1]));
  }, []);
  return (
    <React.Fragment>
      <Paper>
        <HeroUser role={location.search?.split("=")[1]} />
        {/* <Group /> */}
        <AppCard role={location.search?.split("=")[1]} />
      </Paper>
    </React.Fragment>
  );
}

export default Client;
