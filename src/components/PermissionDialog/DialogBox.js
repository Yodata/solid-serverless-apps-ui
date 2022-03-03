import React from "react";
import { connect } from "react-redux";

import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import Avatar from "@material-ui/core/Avatar";
//const BlackListPods = require('../../utility/blacklist.json');
import BlackListPods from "../../utility/blacklist.json";
import { Switch } from "@material-ui/core";

const styles = (theme) => ({
  root: {},
  image: {
    padding: 30,
    objectFit: "contain",
  },
  dialogPaper: {
    minWidth: "60vw",
    maxWidth: "60vw",
    overflowX: "hidden",
  },
  textSpacing: {
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  table: {
    minWidth: "57vw",
    maxWidth: "57vw",
  },
  actionButton: {
    color: "#ffffff",
    backgroundColor: (props) =>
      props.type === "Authorize"
        ? theme.palette.purple.main
        : props.type === "Update"
        ? theme.palette.update.main
        : theme.palette.purple.main,
    "&:hover": {
      backgroundColor: (props) =>
        props.type === "Authorize"
          ? theme.palette.purple.main
          : props.type === "Update"
          ? theme.palette.update.main
          : theme.palette.purple.main,
    },
    marginBottom: 20,
  },
  headerRow: {
    color: theme.palette.purple.main,
  },
  firstMsg: {
    fontSize: "1em",
    maxWidth: 450,
    lineHeight: "1em",
    fontFamily: ["ProximaNovaBold", "Roboto"].join(","),
    marginBottom: 30,
    marginTop: 10,
  },
  secondMsg: {
    fontSize: "1em",
    maxWidth: 250,
    lineHeight: "1em",
  },
  typeButton: {
    maxWidth: "60%",
  },
  avatar: {
    color: theme.palette.purple.main,
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
});

const TopicSwitch = withStyles((theme) => ({
  switchBase: {
    color: theme.palette.white.main,
    "&$checked": {
      transform: "translateX(12px)",
      color: theme.palette.white.main,
      "& + $track": {
        opacity: 1,
        backgroundColor: theme.palette.success.main,
      },
    },
  },
  track: {
    opacity: 1,
    backgroundColor: theme.palette.error.main,
  },
  checked: {},
}))(Switch);

function DialogBox(props) {
  const {
    classes,
    open,
    handleDialog,
    application,
    type,
    allApplications,
    localApplication,
    globalSubs,
    handleAuthorize,
    franchiseList,
    isFranchiseUser,
    adminList,
    userId,
    userData,
    userSubs,
    readLocalPermissions,
    writeLocalPermissions,
    handleWriteLocalPermissions,
    handleReadLocalPermissions,
    handleUpdateLocalStore,
  } = props;

  const onlyReadRole = [
    "bc",
    "owner",
    "broker of record",
    "marketing director",
  ];
  Object.freeze(onlyReadRole);

  const topicsToShow = ["Lead", "Contact", "MarketingPreferences", "Website"];
  Object.freeze(topicsToShow);

  const handleClose = () => {
    handleDialog();
  };

  const handleType = () => {
    handleAuthorize(type);
  };

  const handleImageError = (e) => {
    e.target.onerror = null;
    const name = e.target.name;
    return (
      <Avatar className={classes.avatar}>
        {name?.charAt(0).toUpperCase()}
      </Avatar>
    );
  };
  console.log({ isFranchiseUser });
  const getSubsIdentifier = (value, topic) => {
    if (!value.publishes && !value.subscribes) {
      if (value.object.includes(topic.name.toLowerCase())) {
        return `${value.agent}`;
      }
    } else {
      if (topic.read && topic.write) {
        if (
          value.subscribes.find((value) =>
            value.includes(topic.name.toLowerCase())
          ) &&
          value.publishes.find((value) =>
            value.includes(topic.name.toLowerCase())
          )
        ) {
          return `${value.agent}`;
        } else if (
          value.subscribes.find((value) =>
            value.includes(topic.name.toLowerCase())
          )
        ) {
          return `${value.agent}?read`;
        } else if (
          value.publishes.find((value) =>
            value.includes(topic.name.toLowerCase())
          )
        ) {
          return `${value.agent}?write`;
        }
      } else if (
        topic.write &&
        !topic.read &&
        value.subscribes.length > 0 &&
        value.subscribes.find((value) =>
          value.includes(topic.name.toLowerCase())
        )
      ) {
        return `${value.agent}`;
      } else if (
        topic.read &&
        !topic.write &&
        value.publishes.length > 0 &&
        value.publishes.find((value) =>
          value.includes(topic.name.toLowerCase())
        )
      ) {
        return `${value.agent}`;
      }
    }
  };

  const connectedApps = application.permissions
    .map((topic) => {
      if (topic.read || topic.write) {
        const globalSubsIdentifier =
          globalSubs && globalSubs.items
            ? globalSubs.items
                .map((value) => getSubsIdentifier(value, topic))
                .filter(Boolean)
            : [];
        //value => {
        // if (!value.publishes && !value.subscribes) {
        //     if (value.object.includes(topic.name.toLowerCase())) {
        //         return `${value.agent}`
        //     }
        // } else {
        //     if (topic.read && topic.write) {
        //         if (value.subscribes.find(value => value.includes(topic.name.toLowerCase())) &&
        //             value.publishes.find(value => value.includes(topic.name.toLowerCase()))) {
        //             return `${value.agent}`
        //         } else
        //             if (value.subscribes.find(value => value.includes(topic.name.toLowerCase()))) {
        //                 return `${value.agent}?read`
        //             } else
        //                 if (value.publishes.find(value => value.includes(topic.name.toLowerCase()))) {
        //                     return `${value.agent}?write`
        //                 }
        //     }
        //     else
        //         if (topic.write && !topic.read && value.subscribes.length > 0 &&
        //             value.subscribes.find(value => value.includes(topic.name.toLowerCase()))) {
        //             return `${value.agent}`
        //         } else
        //             if (topic.read && !topic.write && value.publishes.length > 0 &&
        //                 value.publishes.find(value => value.includes(topic.name.toLowerCase()))) {
        //                 return `${value.agent}`
        //             }

        // }
        // ).filter(Boolean)
        console.log(application.id);
        console.log(application.accessLevel);
        console.log(userSubs);

        const userSubsIdentifier =
          userSubs && userSubs.items
            ? userSubs.items
                .map((value) => getSubsIdentifier(value, topic))
                .filter(Boolean)
            : [];
        console.log("global");
        console.log(globalSubsIdentifier);
        const userFilteredSubs = userSubsIdentifier.filter(
          (f) => !globalSubsIdentifier.some((g) => f.includes(g)) // remove duplicate pods from global
        );
        console.log("user 1");
        console.log(userFilteredSubs);
        const subsIdentifier = [...globalSubsIdentifier, ...userFilteredSubs]
          ?.filter(
            (f) =>
              //const subsIdentifier = [...userSubsIdentifier]?.filter(f =>
              !BlackListPods.some((b) => b.pod === f) // remove internal services
          )
          .filter(
            (s) => s !== application.id //remove self
          )
          .sort((a, b) => {
            return a.toUpperCase() > b.toUpperCase() ? 1 : -1;
          });
        console.log("user");
        console.log(subsIdentifier);
        const connectedApplication = subsIdentifier
          ?.map((sub) => {
            const selectedApp = allApplications.find(
              (ele) => ele.id === `${sub.split("?")[0]}`
            );
            return {
              name: selectedApp
                ? selectedApp.name
                : sub.split("/")[2].split(".").shift(),
              image: selectedApp?.logo?.url,
              type: sub.split("?")[1],
            };
          })
          .filter(Boolean);
        return { [topic.name.toLowerCase()]: connectedApplication };
      }
      return null;
    })
    .filter(Boolean);
    console.log(connectedApps)
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        classes={{ paper: classes.dialogPaper }}
        scroll="paper"
      >
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item xs={12}>
            <Paper elevation={0} className={classes.image}>
              <img alt="app logo" src={application.logo.url} width="250" />
            </Paper>
          </Grid>
          {/* <Grid item className={classes.textSpacing}>
            {type !== "Disconnect" ? (
              "REQUIRES ACCESS TO:"
            ) : (
              <Typography align="center" variant="body2">
                Revoking data access permissions for this application will
                disconnect the application from the following:
              </Typography>
            )}
          </Grid> */}
          <Grid item className={classes.textSpacing}>
            <TableContainer>
              <Table className={classes.table} size="small">
                <TableHead className={classes.headerRow}>
                  <TableRow>
                    <TableCell>DATA TYPE</TableCell>
                    <TableCell>DIRECTION</TableCell>
                    <TableCell>CONNECTED APPLICATION</TableCell>
                    <TableCell align="right">SHARE DATA</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(application.accessLevel === "both" ||
                    (application.accessLevel === "franchisees" &&
                      isFranchiseUser) ||
                    (application.accessLevel === "agent" &&
                      !isFranchiseUser)) &&
                    application.permissions?.map((topic) => (
                      <React.Fragment key={topic.name}>
                        {/* {topicsToShow.includes(topic.name) && */}
                        {topic.read && (
                          <TableRow key={`${topic.name}--read`}>
                            <TableCell component="th" scope="row">
                              {topic.name === "Website"
                                ? "Website Customer Activity"
                                : topic.name}
                            </TableCell>
                            <TableCell>Receive from</TableCell>
                            <TableCell>
                              <>
                                <Grid
                                  container
                                  direction="row"
                                  alignItems="center"
                                >
                                  {connectedApps &&
                                    connectedApps.map((app) => {
                                      if (
                                        topic.name.toLowerCase() ===
                                        Object.keys(app)[0].toLowerCase()
                                      ) {
                                        return (
                                          app[topic.name.toLowerCase()] &&
                                          app[topic.name.toLowerCase()].map(
                                            (value) => (
                                              <>
                                                <Grid item>
                                                  {/* <Tooltip title={!value.type ?
                                                                                                (`${application.name}
                                                                                    ${(topic.read && topic.write) ?
                                                                                                        'sends and receives' : (
                                                                                                            topic.write ?
                                                                                                                'sends' :
                                                                                                                'receives'
                                                                                                        )}
                                                                                    ${topic.name === 'Website' ? 'Website Customer Activity' : topic.name} data 
                                                                                    ${(topic.read && topic.write) ?
                                                                                                        'to/from' : (
                                                                                                            topic.write ?
                                                                                                                'to' :
                                                                                                                'from'
                                                                                                        )}
                                                                                    ${value.name.charAt(0).toUpperCase() + value.name.slice(1)}`
                                                                                                ) : (`${application.name}
                                                                                                ${value.type === 'write' ?
                                                                                                        'receives' :
                                                                                                        'sends'
                                                                                                    }
                                                                                                ${topic.name === 'Website' ? 'Website Customer Activity' : topic.name} data 
                                                                                                ${value.type === 'write' ?
                                                                                                        'from' :
                                                                                                        'to'
                                                                                                    }
                                                                                                ${value.name?.charAt(0).toUpperCase() + value.name?.slice(1)}`
                                                                                                )
                                                                                            }
                                                                                                arrow> */}
                                                  <Tooltip
                                                    title={`${
                                                      value.name
                                                        ?.charAt(0)
                                                        .toUpperCase() +
                                                      value.name?.slice(1)
                                                    }`}
                                                    arrow
                                                  >
                                                    {value.image ? (
                                                      <img
                                                        alt="connected application"
                                                        src={value.image}
                                                        width="70"
                                                        name={value.name}
                                                        onError={
                                                          handleImageError
                                                        }
                                                      />
                                                    ) : (
                                                      <Avatar
                                                        className={
                                                          classes.avatar
                                                        }
                                                      >
                                                        {value.name
                                                          ?.charAt(0)
                                                          .toUpperCase()}
                                                      </Avatar>
                                                    )}
                                                  </Tooltip>
                                                </Grid>
                                              </>
                                            )
                                          )
                                        );
                                      }
                                      return null;
                                    })}
                                </Grid>
                              </>
                            </TableCell>
                            <TableCell align="right">
                              <TopicSwitch
                                size="small"
                                checked={readLocalPermissions?.includes(
                                  `realestate/${topic.name.toLowerCase()}`
                                )}
                                name={topic.name + "-write"}
                                onChange={() =>
                                  handleReadLocalPermissions(
                                    `realestate/${topic.name.toLowerCase()}`
                                  )
                                }
                              />
                            </TableCell>
                          </TableRow>
                        )}
                        {topic.write && (
                          <TableRow key={`${topic.name}--write`}>
                            <TableCell component="th" scope="row">
                              {topic.name === "Website"
                                ? "Website Customer Activity"
                                : topic.name}
                            </TableCell>
                            <TableCell>Send to</TableCell>
                            <TableCell>
                              <>
                                <Grid
                                  container
                                  direction="row"
                                  alignItems="center"
                                >
                                  {connectedApps &&
                                    connectedApps.map((app) => {
                                      if (
                                        topic.name.toLowerCase() ===
                                        Object.keys(app)[0].toLowerCase()
                                      ) {
                                        return (
                                          app[topic.name.toLowerCase()] &&
                                          app[topic.name.toLowerCase()].map(
                                            (value) => (
                                              <>
                                                <Grid item>
                                                  {/* <Tooltip title={!value.type ?
                                                                                                    (`${application.name}
                                                                                        ${(topic.read && topic.write) ?
                                                                                                            'sends and receives' : (
                                                                                                                topic.write ?
                                                                                                                    'sends' :
                                                                                                                    'receives'
                                                                                                            )}
                                                                                        ${topic.name === 'Website' ? 'Website Customer Activity' : topic.name} data 
                                                                                        ${(topic.read && topic.write) ?
                                                                                                            'to/from' : (
                                                                                                                topic.write ?
                                                                                                                    'to' :
                                                                                                                    'from'
                                                                                                            )}
                                                                                        ${value.name.charAt(0).toUpperCase() + value.name.slice(1)}`
                                                                                                    ) : (`${application.name}
                                                                                                    ${value.type === 'write' ?
                                                                                                            'receives' :
                                                                                                            'sends'
                                                                                                        }
                                                                                                    ${topic.name === 'Website' ? 'Website Customer Activity' : topic.name} data 
                                                                                                    ${value.type === 'write' ?
                                                                                                            'from' :
                                                                                                            'to'
                                                                                                        }
                                                                                                    ${value.name?.charAt(0).toUpperCase() + value.name?.slice(1)}`
                                                                                                    )
                                                                                                }
                                                                                                    arrow> */}
                                                  <Tooltip
                                                    title={`${
                                                      value.name
                                                        ?.charAt(0)
                                                        .toUpperCase() +
                                                      value.name?.slice(1)
                                                    }`}
                                                    arrow
                                                  >
                                                    {value.image ? (
                                                      <img
                                                        alt="connected application"
                                                        src={value.image}
                                                        width="70"
                                                        name={value.name}
                                                        onError={
                                                          handleImageError
                                                        }
                                                      />
                                                    ) : (
                                                      <Avatar
                                                        className={
                                                          classes.avatar
                                                        }
                                                      >
                                                        {value.name
                                                          ?.charAt(0)
                                                          .toUpperCase()}
                                                      </Avatar>
                                                    )}
                                                  </Tooltip>
                                                </Grid>
                                              </>
                                            )
                                          )
                                        );
                                      }
                                      return null;
                                    })}
                                </Grid>
                              </>
                            </TableCell>
                            <TableCell align="right">
                              <TopicSwitch
                                size="small"
                                checked={writeLocalPermissions?.includes(
                                  `realestate/${topic.name.toLowerCase()}`
                                )}
                                name={topic.name + "-write"}
                                onChange={() =>
                                  handleWriteLocalPermissions(
                                    `realestate/${topic.name.toLowerCase()}`
                                  )
                                }
                              />
                            </TableCell>
                          </TableRow>
                        )}
                      </React.Fragment>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item>
            {/* {type !== "Disconnect" && (
              <Typography
                className={classes.firstMsg}
                align="center"
                variant="subtitle2"
              >
                To add additional Connected Applications, authorize this vendor
                and return to the App Exchange to repeat this process.
              </Typography>
            )} */}
            {isFranchiseUser && application.accessLevel !== "franchisees" && (
              <Grid
                container
                item
                direction="row"
                justifyContent="center"
                alignItems="baseline"
              >
                <Grid item>
                  <Typography
                    className={classes.firstMsg}
                    align="center"
                    variant="subtitle2"
                  >
                    Show this app to agents/teams?
                  </Typography>
                </Grid>
                <Grid item>
                  <TopicSwitch
                    size="small"
                    checked={
                      localApplication?.find((ele) => ele.id === application.id)
                        ?.isFranchiseVisible ?? false
                    }
                    name={"show"}
                    onChange={() => handleUpdateLocalStore(application.id)}
                  />
                </Grid>
              </Grid>
            )}
          </Grid>
          <Grid
            className={classes.textSpacing}
            item
            container
            direction="row"
            justify="space-between"
            alignItems="flex-start"
          >
            <Grid item>
              <Button name="cancel" variant="outlined" onClick={handleClose}>
                cancel
              </Button>
            </Grid>
            <Grid
              className={classes.typeButton}
              container
              item
              direction="column"
              justify="space-evenly"
              alignItems="flex-end"
            >
              <Grid item>
                {userId === userData.contact_id ||
                franchiseList.some(
                  (ele) =>
                    ele.contactId === userData.contact_id &&
                    ele.roleName.toLowerCase() === "app exchange admin"
                ) ||
                !(
                  adminList.some(
                    (ele) =>
                      ele.contactId === userId &&
                      onlyReadRole.includes(ele.roleName.toLowerCase())
                  ) ||
                  franchiseList.some(
                    (ele) =>
                      ele.contactId === userData.contact_id &&
                      onlyReadRole.includes(ele.roleName.toLowerCase())
                  )
                ) ? (
                  <Button
                    className={classes.actionButton}
                    name="submit"
                    variant="contained"
                    onClick={handleType}
                    disableElevation
                  >
                    Save
                  </Button>
                ) : (
                  <Button
                    disabled
                    className={classes.actionButton}
                    name="readOnlySubmit"
                    variant="contained"
                    disableElevation
                  >
                    Save
                  </Button>
                )}
              </Grid>
              <Grid item>
                <Typography
                  className={classes.secondMsg}
                  align="right"
                  variant="subtitle2"
                >
                  {`${
                    isFranchiseUser ? "Franchisee" : "Your"
                  } data will be shared (or not shared) between this vendor and connected applications per the selection above`}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Dialog>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    globalSubs: state.subs.globalSubs,
    userSubs: state.subs.userSubs,
    allApplications: state.apps?.storeData?.application,
    localApplication: state.apps?.localStoreData?.application,
    adminList: state.auth.userList,
    franchiseList: state.auth.franchiseList,
    isFranchiseUser: state.auth.isFranchiseUser,
    userId: state.auth.userId,
    userData: state.auth.userData,
  };
};

export default connect(mapStateToProps)(withStyles(styles)(DialogBox));
