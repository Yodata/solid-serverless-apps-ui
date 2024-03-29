import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import CardActions from "@material-ui/core/CardActions";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Button from "@material-ui/core/Button";
import ErrorIcon from "@material-ui/icons/Error";
import PermissionDialog from "../PermissionDialog";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxOutlinedIcon from "@material-ui/icons/CheckBoxOutlined";

import Permissions from "../Permissions";
import NewApp from "../NewApp";
import {
  serviceEnabled,
  serviceUpdated,
} from "../../redux/slices/servicesSlice";
import { updateLocalAppStore } from "../../redux/actions/applicationActions";
import { Checkbox } from "@material-ui/core";
import publishEvent from "../../api/publishEvents";

/**
 * @Component Card
 * @Description This component shows each individual card of the each app
 */

const styles = (theme) => ({
  root: {
    position: "relative",
    backgroundColor: theme.palette.invisible.main,
    opacity: (props) =>
      props.application.connected ? 0.5 : !props.application.isVisible && 0.5,
    minWidth: "30vw",
    maxWidth: "30vw",
    borderRadius: 0,
    boxShadow: "3px 3px 3px 2px rgba(0,0,0,0.3)",
  },
  cardMedia: {
    padding: 10,
    objectFit: "contain",
  },
  cardContent: {
    height: "155px",
  },
  vendorName: {
    fontFamily: theme.typography.vendorName.fontFamily,
    fontSize: theme.typography.vendorName.fontSize,
    color: theme.palette.purple.main,
  },
  indicator: {
    fontSize: 17.7,
    fontFamily: theme.typography.vendorName.fontFamily,
  },
  editAppDetail: {
    marginTop: 16,
  },
  editImage: {
    marginLeft: 16,
    marginTop: 16,
  },
  editAppTitle: {
    marginbottom: 16,
  },
  hideButton: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  cardActions: {
    maxWidth: "fit-content",
  },
  success: {
    color: theme.palette.success.main,
  },
  error: {
    color: theme.palette.error.main,
  },
  updateRequired: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.white.main,
    "&:hover": {
      backgroundColor: theme.palette.error.main,
    },
  },
  updatePermission: {
    paddingLeft: 1.5,
    paddingRight: 1.5,
    backgroundColor: theme.palette.error.main,
    color: theme.palette.white.main,
    "&:hover": {
      backgroundColor: theme.palette.error.main,
    },
  },
  update: {
    color: theme.palette.update.main,
  },
  adminButtons: {
    backgroundColor: theme.palette.adminButtons.main,
    color: theme.palette.white.main,
    paddingLeft: 13,
    paddingRight: 13,
    "&:hover": {
      backgroundColor: theme.palette.adminButtons.main,
    },
  },
  adminGrid: {
    minWidth: "30vw",
    maxWidth: "30vw",
  },
  connectedApp: {
    maxHeight: 20,
  },
  connectButton: {
    backgroundColor: theme.palette.purple.main,
    color: theme.palette.white.main,
    "&:hover": {
      backgroundColor: theme.palette.purple.main,
    },
  },
});

export function CardComponent(props) {
  const {
    classes,
    application,
    isAdmin,
    updateApplication,
    enableService,
    enabledID,
    updatedService,
    updatedID,
    userData,
    userSubs,
    localStore,
    updateLocalAppStore,
    topicLabels,
    name: username
  } = props;

  const [subscribedPermissions, setSubscribedPermissions] = useState({
    read: userSubs?.items?.find((ele) => ele.agent === application.id)
      ?.subscribes,
    write: userSubs?.items?.find((ele) => ele.agent === application.id)
      ?.publishes,
  });

  const [state, setState] = React.useState({
    isEditable: false,
    isDialogOpen: false,
    isConnected: false,
    editPermission: false,
    readLocalPermissions: subscribedPermissions.read,
    writeLocalPermissions: subscribedPermissions.write,
  });
  useEffect(() => {
    setSubscribedPermissions({
      ...state,
      read:
        userSubs?.items?.find((ele) => ele.agent === application.id)
          ?.subscribes ??
        // application.permissions
        //   .map((value) => {
        //     return (
        //       value.read === true && `realestate/${value.name.toLowerCase()}`
        //     );
        //   })
        //   .filter(Boolean) ??
        [],
      write:
        userSubs?.items?.find((ele) => ele.agent === application.id)
          ?.publishes ??
        // application.permissions
        //   .map((value) => {
        //     return (
        //       value.write === true && `realestate/${value.name.toLowerCase()}`
        //     );
        //   })
        //   .filter(Boolean) ??
        [],
    });
  }, [userSubs]);
  useEffect(() => {
    setState({
      ...state,
      readLocalPermissions: subscribedPermissions.read,
      writeLocalPermissions: subscribedPermissions.write,
    });
  }, [subscribedPermissions, state.isDialogOpen]);

  const handleReadLocalPermissions = (topicArr) => {
    const newArray = state.readLocalPermissions.slice();
    const newUserPermissions = topicArr.some((x) => newArray.includes(x))
      ? newArray.filter((el) => !topicArr.includes(el))
      : [...newArray, ...topicArr];
    setState({ ...state, readLocalPermissions: newUserPermissions });
  };

  const handleWriteLocalPermissions = (topicArr) => {
    const newArray = state.writeLocalPermissions.slice();
    const newUserPermissions = topicArr.some((x) => newArray.includes(x))
      ? newArray.filter((el) => !topicArr.includes(el))
      : [...newArray, ...topicArr];
    setState({ ...state, writeLocalPermissions: newUserPermissions });
  };

  const handleUpdateLocalStore = (id) => {
    let newLocalApp = {};
    const appObj = localStore?.find((ele) => ele.id === id);
    if (appObj) {
      newLocalApp = {
        ...appObj,
        isFranchiseVisible: !appObj.isFranchiseVisible,
      };
    } else {
      newLocalApp = {
        id,
        isFranchiseVisible: true,
      };
    }
    updateLocalAppStore(newLocalApp);
  };

  const handleEdit = () => {
    setState({ ...state, isEditable: true });
  };

  const handleCancel = () => {
    setState({ ...state, isEditable: false });
  };

  const handleVisibility = () => {
    if (application.connected === false) {
      const editedApplication = JSON.parse(JSON.stringify(application));
      editedApplication.isVisible = !application.isVisible;
      editedApplication.modifiedBy = username
      editedApplication.modifiedDate = Date.now()
      editApplication(editedApplication);
    }
  };

  const editApplication = (app) => {
    updateApplication(app);
    setState({ ...state, isEditable: false });
  };

  const handleActivity = (e) => {
    setState({ ...state, isDialogOpen: true });
  };

  const handleDialogClose = () => {
    setState({ ...state, isDialogOpen: false });
  };

  const handleImageError = (e) => {
    e.target.onerror = null;
    const name = e.target.name;
    e.target.src = `https://via.placeholder.com/150/e6e6e6/000000?text=${name}`;
  };

  const handleConnected = () => {
    const editedApplication = JSON.parse(JSON.stringify(application));
    editedApplication.connected = !application.connected;
    editedApplication.isVisible = !editedApplication.connected;
    editedApplication.modifiedBy = username
    editedApplication.modifiedDate = Date.now()
    editApplication(editedApplication);
  };

  const handlePermission = () => {
    setState({ ...state, editPermission: true });
  };

  const handlePermissionCancel = () => {
    setState({ ...state, editPermission: false });
  };

  const handlePermissionChanged = (permissions, accessLevel, accessLevelInfo) => {
    const editedApplication = JSON.parse(JSON.stringify(application));
    editedApplication.permissions = permissions;
    editedApplication.accessLevel = accessLevel;
    editedApplication.accessModifiedBy = accessLevelInfo.modifiedBy
    editedApplication.accessModifiedDate = accessLevelInfo.lastModified
    editedApplication.version = (
      1 + Number.parseInt(editedApplication.version)
    ).toString();
    editApplication(editedApplication);
    setState({ ...state, editPermission: false });
  };

  const handleAuthorize = (type, disabledTopics) => {
    setSubscribedPermissions({
      read: state.readLocalPermissions,
      write: state.writeLocalPermissions
    })
    const payload = generateData(type, disabledTopics);
    if (type !== "Update") {
      if (
        state.readLocalPermissions?.length === 0 &&
        state.writeLocalPermissions?.length === 0
      ) {
        enableService({ id: application.id.toLowerCase(), connect: false });
      } else {
        enableService({ id: application.id.toLowerCase(), connect: true });
      }
    } else {
      const newUpdateIDs = updatedID.slice();
      const index = newUpdateIDs.indexOf(application.id.toLowerCase());
      newUpdateIDs.splice(index, 1);
      updatedService(newUpdateIDs);
    }
    handleDialogClose();
    publishEvent(payload);
  };
  const generateData = (type, disabledTopics) => {
    return {
      topic: `yodata/subscription#${type !== "Update"
        ? state.readLocalPermissions?.length === 0 &&
          state.writeLocalPermissions?.length === 0
          ? "revoke"
          : "authorize"
        : "update"
        }`,
      recipient: `${userData.profile_id}`,
      source: `https://subscription-data-agg.${process.env.REACT_APP_HOSTNAME}/profile/card#me`,
      data: {
        type: `${type !== "Update"
          ? state.readLocalPermissions?.length === 0 &&
            state.writeLocalPermissions?.length === 0
            ? "Revoke"
            : "Authorize"
          : "Update"
          }Action`,
        agent: `${userData.profile_id}`,
        instrument: `https://forevercloudstore.${process.env.REACT_APP_HOSTNAME}`,
        object: {
          type: "Subscription",
          lastModifiedDate: `${Date.now()}`,
          lastModifiedBy: username,
          version: `${application.version}`,
          agent: `${application.id}`,
          instrument: `https://forevercloudstore.${process.env.REACT_APP_HOSTNAME}`,
          host: `https://${userData.contact_id}${userData.userDomain}`,
          subscribes: state.readLocalPermissions.filter(
            (x) => !disabledTopics.read.includes(x)
          ).map(x => x.split(' ').join('')),
          publishes: state.writeLocalPermissions.filter(
            (x) => !disabledTopics.write.includes(x)
          ).map(x => x.split(' ').join('')),
        },
      },
    };
  };

  return (
    <React.Fragment>
      {state.isEditable ? (
        <NewApp
          isEditMode={state.isEditable}
          application={application}
          editApplication={editApplication}
          handleCancel={handleCancel}
        />
      ) : (
        <React.Fragment>
          <Grid
            container
            direction="column"
            alignItems="flex-start"
            justify="flex-start"
          >
            <Grid item>
              <Card elevation={3} className={classes.root}>
                {isAdmin && (
                  <>
                    <Grid
                      className={classes.connectedApp}
                      container
                      direction="row"
                      alignItems="center"
                      justify="flex-start"
                    >
                      <Grid item>
                        <Checkbox
                          checked={application.connected}
                          icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                          checkedIcon={
                            <CheckBoxOutlinedIcon
                              style={{ color: "black" }}
                              fontSize="small"
                            />
                          }
                          name="checkedConnectedApp"
                          onChange={handleConnected}
                        />
                      </Grid>
                      <Grid item>
                        <Typography>Connected App</Typography>
                      </Grid>
                    </Grid>
                    <IconButton
                      className={classes.hideButton}
                      onClick={handleVisibility}
                    >
                      {!application.connected && application.isVisible ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  </>
                )}
                <CardMedia
                  component="img"
                  height="140"
                  name={application.name}
                  className={classes.cardMedia}
                  image={application.logo.url}
                  title={application.name}
                  onError={handleImageError}
                />
                <CardContent className={classes.cardContent}>
                  <Typography
                    className={classes.vendorName}
                    variant="h5"
                    component="h2"
                  >
                    {application.name}
                  </Typography>
                  <Typography variant="body2">
                    {application.description}
                  </Typography>
                </CardContent>
                {!isAdmin && (
                  <CardActions>
                    <Grid
                      container
                      direction="row"
                      alignItems="center"
                      justify="space-between"
                    >
                      <Grid
                        className={classes.cardActions}
                        spacing={1}
                        item
                        container
                        direction="row"
                        alignItems="center"
                        justify="flex-start"
                      >
                        <Grid item variant="body1">
                          {enabledID?.includes(
                            application.id.toLowerCase()
                          ) && (
                              <Typography className={classes.success}>
                                Connected
                              </Typography>
                            )}
                        </Grid>
                        <Grid item>
                          {enabledID?.includes(application.id.toLowerCase()) &&
                            (!updatedID?.includes(
                              application.id.toLowerCase()
                            ) ? (
                              <CheckCircleIcon className={classes.success} />
                            ) : (
                              <ErrorIcon className={classes.error} />
                            ))}
                        </Grid>
                      </Grid>
                      <Grid item>
                        {enabledID?.includes(application.id.toLowerCase()) ? (
                          !updatedID?.includes(application.id.toLowerCase()) ? (
                            <Button
                              name="setting"
                              variant="outlined"
                              onClick={handleActivity}
                              disableElevation
                            >
                              Settings
                            </Button>
                          ) : (
                            <Button
                              className={classes.updateRequired}
                              name="update"
                              variant="contained"
                              onClick={handleActivity}
                              disableElevation
                            >
                              Update Required
                            </Button>
                          )
                        ) : (
                          <Button
                            className={classes.connectButton}
                            name="connect"
                            variant="contained"
                            onClick={handleActivity}
                            disableElevation
                          >
                            Connect
                          </Button>
                        )}
                      </Grid>
                    </Grid>
                  </CardActions>
                )}
              </Card>
            </Grid>
            {isAdmin && (
              <Grid
                item
                className={classes.adminGrid}
                container
                direction="row"
                justify="flex-end"
              >
                {!application.connected && (
                  <Grid item>
                    {!application.permissions.some((topic) => {
                      if (topic.read || topic.write) {
                        return !topicLabels[
                          topic?.name?.toLowerCase().replaceAll(/\s/g, "")
                        ]?.isLabelEnabled;
                      }
                      return false;
                    }) ? (
                      <Button
                        className={classes.adminButtons}
                        variant="contained"
                        onClick={handlePermission}
                      >
                        Edit Permission
                      </Button>
                    ) : (
                      <Button
                        className={classes.updatePermission}
                        variant="contained"
                        onClick={handlePermission}
                      >
                        Update Permission
                      </Button>
                    )}
                  </Grid>
                )}
                <Grid item>
                  <Button
                    className={classes.adminButtons}
                    variant="contained"
                    onClick={handleEdit}
                  >
                    Edit Company Info
                  </Button>
                </Grid>
              </Grid>
            )}
          </Grid>
          <Permissions
            open={state.editPermission}
            handleDialog={handlePermissionCancel}
            permissions={application.permissions}
            logo={application.logo.url}
            application={application}
            handlePermissionChanged={handlePermissionChanged}
            applicationAccessLevel={application.accessLevel}
            username={username}
          />
          <PermissionDialog
            open={state.isDialogOpen}
            handleDialog={handleDialogClose}
            application={application}
            handleAuthorize={handleAuthorize}
            readLocalPermissions={state.readLocalPermissions}
            writeLocalPermissions={state.writeLocalPermissions}
            handleUpdateLocalStore={handleUpdateLocalStore}
            handleReadLocalPermissions={handleReadLocalPermissions}
            handleWriteLocalPermissions={handleWriteLocalPermissions}
            subscribedPermissions={subscribedPermissions}
            type={
              enabledID?.includes(application.id.toLowerCase())
                ? !updatedID?.includes(application.id.toLowerCase())
                  ? "Disconnect"
                  : "Update"
                : "Authorize"
            }
          />
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
const mapStateToProps = (state) => {
  return {
    enabledID: state.services.enabledID,
    updatedID: state.services.updatedID,
    userData: state.auth.userData,
    name: state.auth.name,
    userId: state.auth.userId,
    userSubs: state.subs.userSubs,
    localStore: state.apps?.localStoreData?.application,
    topicLabels: state.topic.topicLabels,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    enableService: (id) => dispatch(serviceEnabled(id)),
    updatedService: (id) => dispatch(serviceUpdated(id)),
    updateLocalAppStore: (value) => dispatch(updateLocalAppStore(value)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CardComponent));
