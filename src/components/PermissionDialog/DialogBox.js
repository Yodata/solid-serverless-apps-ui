import React, { useState, useEffect } from "react";
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
import { IconButton, Typography } from "@material-ui/core";
import { Switch } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Clear";

const styles = (theme) => ({
  root: {},
  image: {
    padding: 30,
    objectFit: "contain",
  },
  connectedAppImage: {
    objectFit: "contain",
  },
  dialogPaper: {
    minWidth: "60vw",
    maxWidth: "60vw",
    overflowX: "hidden",
  },
  connectedAppDialog: {
    maxWidth: "60vw",
    overflowX: "hidden",
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 30,
  },
  textSpacing: {
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  bottomContainer: {
    flexWrap: "nowrap",
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
  secondMsg1: {
    fontSize: "1em",
    maxWidth: 250,
    lineHeight: "1em",
    paddingTop: 24,
  },
  typeButton: {
    maxWidth: "60%",
  },
  avatar: {
    color: theme.palette.purple.main,
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  connectedCell: {
    textDecoration: "underline",
    color: "blue",
  },
  closeIcon: {
    width: 20,
    padding: 0,
    alignSelf: "flex-end",
    left: 25,
  },
  marginBottom: {
    marginBottom: 20
  }
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
    handleAuthorize,
    isFranchiseUser,
    userSubs,
    readLocalPermissions,
    writeLocalPermissions,
    handleWriteLocalPermissions,
    handleReadLocalPermissions,
    handleUpdateLocalStore,
    topicLabels,
    subscribedPermissions,
    userId,
    userData,
    adminList,
    franchiseList
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

  const [state, setState] = useState({
    readPermissionArray: [],
    writePermissionArray: [],
    isConnectedApp: false,
  });

  useEffect(() => {
    if (open) {
      createPermissionsArray();
    }
  }, [open]);

  const handleClose = () => {
    handleDialog();
  };

  const getDisabledTopicsArray = (array) => {
    return array
      ?.map((x) => x.topics)
      ?.flat()
      ?.map((y) => `realestate/${y?.toLowerCase()}`);
  };

  const handleType = () => {
    handleAuthorize(type, {
      read: getDisabledTopicsArray(
        state.readPermissionArray?.filter((e) => !e.enabled)
      ),
      write: getDisabledTopicsArray(
        state.writePermissionArray?.filter((e) => !e.enabled)
      ),
    });
  };

  const getConnectedApps = (type, topic) => {
    return userSubs && userSubs.items
      ? userSubs.items
        .map((value) => {
          if (
            value[type].map((value) => value.split("/")[1]).includes(topic)
          ) {
            const selectedApp = allApplications.find(
              (x) => x.id === value.agent
            );
            return (
              selectedApp && {
                //remove any app which is not in the store
                id: selectedApp.id,
                name: selectedApp.name
                  ? selectedApp.name
                  : value.agent.split("/")[2].split(".").shift(),
                image: selectedApp.logo?.url,
              }
            );
          }
        })
        .filter(Boolean)
        .filter(
          (s) => s.id !== application.id //remove self
        )
        .filter(
          (v, i, a) => a.findIndex((x) => x.name === v.name) === i //remove same name and duplicates
        )
      : [];
  };

  const mergeTopics = (topicArray) => {
    let seen = new Map();
    const array = topicArray.filter(function (entry) {
      let previous;
      // Have we seen this label before?
      if (seen.hasOwnProperty(entry.label)) {
        // Yes, grab it and add this data to it
        previous = seen[entry.label];
        previous.topics.push(...entry.topics);
        previous.connectedApps.push(...entry.connectedApps);
        // Don't keep this entry, we've merged it into the previous one.filter(
        return false;
      }
      // Remember that we've seen it
      seen[entry.label] = entry;
      // Keep this one, we'll merge any others that match into it
      return true;
    });
    const newArray = array?.forEach((z) => {
      const a = z.connectedApps.filter(
        (v, i, a) => a.findIndex((x) => x.name === v.name) === i
        //remove same name and duplicates
      );
      z.connectedApps = a;
    });
    return array;
  };

  const createPermissionsArray = () => {
    const subSubscribes =
      userSubs &&
      userSubs.items &&
      userSubs.items
        .find((e) => e.agent === application.id)
        ?.subscribes?.map((y) => y.split("/")[1]);
    const subPublishes =
      userSubs &&
      userSubs.items &&
      userSubs.items
        .find((e) => e.agent === application.id)
        ?.publishes?.map((y) => y.split("/")[1]);
    let readArray = application.permissions
      .map((topic) => {
        if (topic.read || subSubscribes?.includes(topic.name.toLowerCase())) {
          const labelObject =
            topicLabels[topic?.name?.toLowerCase().replaceAll(/\s/g, "")];
          const label = labelObject?.label
            ? labelObject?.label
            : labelObject?.name;
          const connectedApps = getConnectedApps(
            "publishes",
            topic?.name?.toLowerCase()
          );
          return {
            topics: [topic.name],
            label,
            connectedApps,
            type: "read",
            enabled: topic.read ? true : false,
          };
        }
      })
      .filter(Boolean);
    let writeArray = application.permissions
      .map((topic) => {
        if (topic.write || subPublishes?.includes(topic.name.toLowerCase())) {
          const labelObject =
            topicLabels[topic?.name?.toLowerCase().replaceAll(/\s/g, "")];
          const label = labelObject?.label
            ? labelObject?.label
            : labelObject?.name;
          const connectedApps = getConnectedApps(
            "subscribes",
            topic?.name?.toLowerCase()
          );
          return {
            topics: [topic.name],
            label,
            connectedApps,
            type: "write",
            enabled: topic.write ? true : false,
          };
        }
      })
      .filter(Boolean);
    readArray = mergeTopics(readArray);
    writeArray = mergeTopics(writeArray);
    setState({
      readPermissionArray: readArray,
      writePermissionArray: writeArray,
    });
  };

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
                    state.readPermissionArray.map((read) => (
                      <React.Fragment key={`${read.label}-read--fragment`}>
                        <TableRow key={`${read.label}-read--row`}>
                          <TableCell component="th" scope="row">
                            {read.label}
                          </TableCell>
                          <TableCell>Receive from</TableCell>
                          <TableCell
                            className={classes.connectedCell}
                            onClick={() =>
                              setState({
                                ...state,
                                isConnectedApp: true,
                                connectedAppContent: read,
                              })
                            }
                          >
                            {`View ${read?.connectedApps?.length} connected applications`}
                          </TableCell>
                          <TableCell align="right">
                            <TopicSwitch
                              size="small"
                              disabled={!read.enabled || !(userId === userData.contact_id ||
                                franchiseList.some(ele => ele.contactId === userData.contact_id &&
                                  ele.roleName.toLowerCase() === 'app exchange admin') ||
                                !(adminList.some(ele => ele.contactId === userId &&
                                  onlyReadRole.includes(ele.roleName.toLowerCase())) ||
                                  franchiseList.some(ele => ele.contactId === userData.contact_id &&
                                    onlyReadRole.includes(ele.roleName.toLowerCase()))))}
                              checked={
                                read.topics.some((x) =>
                                  readLocalPermissions?.includes(
                                    `realestate/${x.toLowerCase()}`
                                  )
                                ) && read.enabled
                              }
                              onChange={() => {
                                handleReadLocalPermissions(
                                  read.topics.map(
                                    (x) => `realestate/${x.toLowerCase()}`
                                  )
                                );
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      </React.Fragment>
                    ))}
                  {(application.accessLevel === "both" ||
                    (application.accessLevel === "franchisees" &&
                      isFranchiseUser) ||
                    (application.accessLevel === "agent" &&
                      !isFranchiseUser)) &&
                    state.writePermissionArray.map((write) => (
                      <React.Fragment key={`${write.label}-write--fragment`}>
                        <TableRow key={`${write.label}-write--row`}>
                          <TableCell component="th" scope="row">
                            {write.label}
                          </TableCell>
                          <TableCell>Send to</TableCell>
                          <TableCell
                            className={classes.connectedCell}
                            onClick={() =>
                              setState({
                                ...state,
                                isConnectedApp: true,
                                connectedAppContent: write,
                              })
                            }
                          >
                            {`View ${write?.connectedApps?.length} connected applications`}
                          </TableCell>
                          <TableCell align="right">
                            <TopicSwitch
                              size="small"
                              disabled={!write.enabled || !(userId === userData.contact_id ||
                                franchiseList.some(ele => ele.contactId === userData.contact_id &&
                                  ele.roleName.toLowerCase() === 'app exchange admin') ||
                                !(adminList.some(ele => ele.contactId === userId &&
                                  onlyReadRole.includes(ele.roleName.toLowerCase())) ||
                                  franchiseList.some(ele => ele.contactId === userData.contact_id &&
                                    onlyReadRole.includes(ele.roleName.toLowerCase()))))}
                              checked={
                                write.topics.some((x) =>
                                  writeLocalPermissions?.includes(
                                    `realestate/${x.toLowerCase()}`
                                  )
                                ) && write.enabled
                              }
                              onChange={() => {
                                handleWriteLocalPermissions(
                                  write.topics.map(
                                    (x) => `realestate/${x.toLowerCase()}`
                                  )
                                );
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      </React.Fragment>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item>
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
                    disabled={!(userId === userData.contact_id ||
                      franchiseList.some(ele => ele.contactId === userData.contact_id &&
                        ele.roleName.toLowerCase() === 'app exchange admin') ||
                      !(adminList.some(ele => ele.contactId === userId &&
                        onlyReadRole.includes(ele.roleName.toLowerCase())) ||
                        franchiseList.some(ele => ele.contactId === userData.contact_id &&
                          onlyReadRole.includes(ele.roleName.toLowerCase()))))}
                    onChange={() => handleUpdateLocalStore(application.id)}
                  />
                </Grid>
              </Grid>
            )}
          </Grid>
          <Grid
            className={[classes.textSpacing, classes.bottomContainer]}
            item
            container
            direction="row"
            justify="space-between"
            alignItems="flex-start"
          >
            <Grid
              className={classes.typeButton}
              container
              item
              direction="column"
              justify="space-evenly"
              alignItems="flex-start"
            >
              <Grid item>
                <Button name="cancel" variant="outlined" onClick={handleClose} className={classes.marginBottom} >
                  cancel
                </Button>
              </Grid>
              <Grid item>
                <Typography
                  className={classes.secondMsg}
                  align="left"
                  variant="subtitle2"
                >
                  {`Core Services include the Berkshire Hathaway HomeServices website, SAGE CRM, Marketing REsource, Lead Admin, ALP/ATM, and MAR/SAR.`}
                </Typography>
              </Grid>
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
                <Button
                  className={classes.actionButton}
                  name="submit"
                  variant="contained"
                  disabled={!(userId === userData.contact_id ||
                    franchiseList.some(ele => ele.contactId === userData.contact_id &&
                      ele.roleName.toLowerCase() === 'app exchange admin') ||
                    !(adminList.some(ele => ele.contactId === userId &&
                      onlyReadRole.includes(ele.roleName.toLowerCase())) ||
                      franchiseList.some(ele => ele.contactId === userData.contact_id &&
                        onlyReadRole.includes(ele.roleName.toLowerCase()))))}
                  onClick={handleType}
                  disableElevation
                >
                  Save
                </Button>
              </Grid>
              <Grid item>
                <Typography
                  className={classes.secondMsg}
                  align="right"
                  variant="subtitle2"
                >
                  {`${isFranchiseUser ? "Franchisee" : "Your"
                    } data will be shared (or not shared) between this vendor and connected applications per the selection above`}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Dialog
          open={state.isConnectedApp}
          onClose={() => setState({ ...state, isConnectedApp: false })}
          classes={{ paper: classes.connectedAppDialog }}
          scroll="paper"
        >
          <IconButton
            className={classes.closeIcon}
            onClick={() => setState({ ...state, isConnectedApp: false })}
          >
            <CloseIcon />
          </IconButton>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Grid item xs={12}>
              <Paper elevation={0} className={classes.connectedAppImage}>
                <img alt="app logo" src={application.logo.url} width="150" />
              </Paper>
            </Grid>
            <Grid item>
              {`${state?.connectedAppContent?.type === "write"
                ? "Send"
                : "Receive"
                } ${state.connectedAppContent?.label} ${state?.connectedAppContent?.type === "write" ? "to:" : "from:"
                }`}
            </Grid>
            {state?.connectedAppContent?.connectedApps
              .sort((a, b) =>
                a.name.toLowerCase().localeCompare(b.name.toLowerCase())
              )
              .map((value) => (
                <Grid item xs={12}>
                  <Typography
                    className={classes.secondMsg1}
                    align="right"
                    variant="subtitle2"
                  >
                    {value.name}
                  </Typography>
                </Grid>
              ))}
          </Grid>
        </Dialog>
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
    topicLabels: state.topic.topicLabels,
  };
};

export default connect(mapStateToProps)(withStyles(styles)(DialogBox));
