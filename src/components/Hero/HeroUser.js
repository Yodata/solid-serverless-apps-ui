import React from "react";
import Paper from "@material-ui/core/Paper";
import { HeaderUser } from "../Header";
import { withStyles, Button, Grid, Typography } from "@material-ui/core";
import { history } from "../Authentication/history";
import endpoint from "../../api/endpoints";
import { useSelector, useDispatch } from "react-redux";
import {
  authorisedUserList,
  setProfileId,
  getParentOrgandRole,
} from "../../redux/actions/authenticationActions";
import { userSubscriptions } from "../../redux/actions/subscriptionAction";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {
  serviceEnabled,
  serviceUpdated,
} from "../../redux/slices/servicesSlice";
import Toast from "../Toast";

const styles = (theme) => ({
  adminButton: {
    // position: 'absolute',
    // top: 0,
    // right: 0,
    // paddingTop: 30,
    // paddingBottom: 10
  },
  switchUser: {
    // position: 'absolute',
    // top: 30,
    // right: 0
  },
  switchButton: {
    position: "absolute",
    top: 60,
    right: 0,
  },
  userText: {
    maxWidth: 150,
    minWidth: 150,
  },
  resize: {
    fontSize: 16,
  },
  selectContainer: {
    display: "flex",
    flexDirection: "column",
  },
});

function HeroUser(props) {
  const { classes } = props;
  const state = useSelector((state) => ({
    id: state.auth.userId,
    userData: state.auth.userData,
    userList: state.auth.userList,
    franchiseList: state.auth.franchiseList,
    success: state.toast.success,
    roleName: state.role.roleName,
    agentAccess: state.auth.isAgentAcess
  }));
  console.log("State.franchiseList in HeroUser:", state.franchiseList);
  const dispatch = useDispatch();
  const [user, setUser] = React.useState(state.userData.contact_id);
  const [franchiseUser, setFranchiseUser] = React.useState("");
  const [toastOpen, setToastOpen] = React.useState(false);
  const [param, setParam] = React.useState("");

  React.useEffect(() => {
    dispatch(authorisedUserList());
  }, []);

  const switchUI = () => {
    history.push("/admin");
  };

  const handleChange = (e) => {
    setUser(e.currentTarget.value);
  };

  const handleSubmit = () => {
    dispatch(
      setProfileId(
        `https://${user}.${process.env.REACT_APP_HOSTNAME}/${endpoint.profile}`
      )
    );
    dispatch(getParentOrgandRole());
    dispatch(serviceEnabled(false));
    dispatch(serviceUpdated());
    dispatch(userSubscriptions(user));
    setToastOpen(true);
  };

  const handleSelect = (e) => {
    sessionStorage.removeItem("role");
    setParam("");
    const value =
      e.target.value === "" ? state.franchiseList[state.franchiseList?.findIndex(x => x.type === ((state.roleName) ?? 'organization'))]?.contactId ?? state.franchiseList[state.franchiseList?.findIndex(x => x.type === ('team'))]?.contactId : e.target.value.toLowerCase();
    setFranchiseUser(e.target.value);
    dispatch(
      setProfileId(
        state?.franchiseList?.find((franchise) => value === franchise.contactId)
          ?.profileId
      )
    );
    dispatch(getParentOrgandRole());
    dispatch(serviceEnabled(false));
    dispatch(serviceUpdated());
    dispatch(userSubscriptions());
  };

  const handleToastClose = () => {
    setToastOpen(false);
  };
  const roleParam = sessionStorage.getItem("role");
  console.log("roleParam:", roleParam);
  React.useEffect(() => {
    if(roleParam){
      setParam(roleParam);
    }
  }, [roleParam]);

  return (
    <>
      <Paper elevation={0}>
        <Grid
          container
          direction="column"
          className={classes.adminButton}
          alignItems="flex-end"
        >
          {state.userList.some(
            (ele) => ele.contactId === state.id && ele.roleName === "AEA"
          ) && (
              <Grid item>
                <Button onClick={switchUI}>Switch to admin UI</Button>
              </Grid>
            )}
          {state.userList.some(
            (ele) => ele.contactId === state.id && ele.roleName
          ) ? (
            <>
              <Grid item>
                <Typography style={{ fontSize: "10px" }}>
                  Enter Company or Contact ID
                </Typography>
                <TextField
                  margin="dense"
                  variant="outlined"
                  className={classes.userText}
                  onChange={handleChange}
                  defaultValue={user}
                  InputProps={{
                    classes: {
                      input: classes.resize,
                    },
                  }}
                />
              </Grid>
              <Grid item>
                <Button className={classes.userText} onClick={handleSubmit}>
                  Submit
                </Button>
              </Grid>
            </>
          ) : (
            state.agentAccess && state.franchiseList?.length > 0 && (
              <Grid item className={classes.selectContainer}>
                <Typography style={{ fontSize: "10px" }}>
                  Select Company/Self/Team ID
                </Typography>
                <Select
                  value={franchiseUser}
                  onChange={handleSelect}
                  displayEmpty
                >
                  <MenuItem value="">
                    <Typography>
                      {(state.roleName === "self" || param === "self") 
                        ? state.franchiseList[
                          state.franchiseList?.length - 1
                        ].contactId
                          .split("//")
                          .pop()
                          .split(".")
                          .shift()
                          .toUpperCase()
                        : (
                          (state.roleName === "team") ? (
                            state.franchiseList[
                              state.franchiseList?.findIndex(x => x.type === 'team')
                            ].contactId
                              .split("//")
                              .pop()
                              .split(".")
                              .shift()
                              .toUpperCase()
                          )
                            : (state.franchiseList?.findIndex(x => x.type === 'organization') !== -1 ?
                              state.franchiseList[
                                state.franchiseList?.findIndex(x => x.type === 'organization')
                              ]?.contactId
                                ?.split("//")
                                ?.pop()
                                ?.split(".")
                                ?.shift()
                                ?.toUpperCase()
                              : state.franchiseList[
                                state.franchiseList?.findIndex(x => x.type === 'team')
                              ]?.contactId
                                ?.split("//")
                                ?.pop()
                                ?.split(".")
                                ?.shift()
                                ?.toUpperCase()
                            )
                        )
                      }
                    </Typography>
                  </MenuItem>
                  {state.franchiseList.map((ele, index) => {
                    if (state.roleName === "self" || param === "self") {
                      if (ele.type !== "self") {
                        const value = ele.contactId
                          .split("//")
                          .pop()
                          .split(".")
                          .shift();
                        return (
                          <MenuItem value={value} key={ele.contactId} v>
                            <Typography>{value.toUpperCase()}</Typography>
                          </MenuItem>
                        );
                      }
                    } else if (state.roleName === "team" || param === "team") {
                      if (ele.type !== "team") {
                        const value = ele.contactId
                          .split("//")
                          .pop()
                          .split(".")
                          .shift();
                        return (
                          <MenuItem value={value} key={ele.contactId} v>
                            <Typography>{value.toUpperCase()}</Typography>
                          </MenuItem>
                        );
                      }
                    } else {
                      if (state.franchiseList?.findIndex(x => x.type === 'organization') !== -1 ? ele.type !== "organization" : ele.type !== "team") {
                        const value = ele.contactId
                          .split("//")
                          .pop()
                          .split(".")
                          .shift();
                        return (
                          <MenuItem value={value} key={ele.contactId} >
                            <Typography>{value.toUpperCase()}</Typography>
                          </MenuItem>
                        );
                      }
                    }
                  })}
                </Select>
              </Grid>
            )
          )}
        </Grid>
        <HeaderUser />
        <Toast
          open={toastOpen}
          handleToastClose={handleToastClose}
          message={
            state.success
              ? "Subscriptions are updated"
              : "No subscriptions present"
          }
          type={state.success ? "success" : "error"}
        />
      </Paper>
    </>
  );
}

export default withStyles(styles)(HeroUser);
