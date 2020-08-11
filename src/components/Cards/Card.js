import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import CardActions from '@material-ui/core/CardActions';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Button from '@material-ui/core/Button';
import ErrorIcon from '@material-ui/icons/Error';
import PermissionDialog from '../PermissionDialog'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';

import Permissions from '../Permissions'
import NewApp from '../NewApp';
import { serviceEnabled, serviceUpdated } from '../../redux/slices/servicesSlice';
import { Checkbox } from '@material-ui/core';
import publishEvent from '../../api/publishEvents'

/**
 * @Component Card
 * @Description This component shows each individual card of the each app
 */

const styles = theme => ({
  root: {
    position: 'relative',
    backgroundColor: theme.palette.invisible.main,
    opacity: props => (props.application.connected ? 0.5 : !props.application.isVisible && 0.5),
    minWidth: '26vw',
    maxWidth: '26vw',
    borderRadius: 0,
    boxShadow: '3px 3px 3px 2px rgba(0,0,0,0.3)'
  },
  cardMedia: {
    padding: 10,
    objectFit: "contain",
  },
  cardContent: {
    height: '155px',
  },
  vendorName: {
    fontFamily: theme.typography.vendorName.fontFamily,
    fontSize: theme.typography.vendorName.fontSize,
    color: theme.palette.purple.main
  },
  indicator: {
    fontSize: 17.7,
    fontFamily: theme.typography.vendorName.fontFamily
  },
  editAppDetail: {
    marginTop: 16
  },
  editImage: {
    marginLeft: 16,
    marginTop: 16
  },
  editAppTitle: {
    marginbottom: 16
  },
  hideButton: {
    position: 'absolute',
    top: 0,
    right: 0
  },
  cardActions: {
    maxWidth: 'fit-content'
  },
  success: {
    color: theme.palette.success.main
  },
  error: {
    color: theme.palette.error.main
  },
  updateRequired: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.white.main,
    '&:hover': {
      backgroundColor: theme.palette.error.main,
    }
  },
  update: {
    color: theme.palette.update.main
  },
  adminButtons: {
    backgroundColor: theme.palette.adminButtons.main,
    color: theme.palette.white.main,
    paddingLeft: 26.9,
    paddingRight: 26.9,
    '&:hover': {
      backgroundColor: theme.palette.adminButtons.main,
    }
  },
  adminGrid: {
    minWidth: '26vw',
    maxWidth: '26vw'
  },
  connectedApp: {
    maxHeight: 20
  },
  connectButton: {
    backgroundColor: theme.palette.purple.main,
    color: theme.palette.white.main,
    '&:hover': {
      backgroundColor: theme.palette.purple.main,
    }
  }
});

export function CardComponent(props) {

  const [state, setState] = React.useState({
    isEditable: false,
    isDialogOpen: false,
    isConnected: false,
    editPermission: false
  })
  const { classes, application, isAdmin, updateApplication, enableService, enabledID, updatedService, updatedID, userData } = props

  const handleEdit = () => {
    setState({ ...state, isEditable: true });
  };

  const handleCancel = () => {
    setState({ ...state, isEditable: false });
  }

  const handleVisibility = () => {
    if(application.connected === false){
      const editedApplication = JSON.parse(JSON.stringify(application));
      editedApplication.isVisible = !application.isVisible
      editApplication(editedApplication);
    }
  }

  const editApplication = app => {
    updateApplication(app);
    setState({ ...state, isEditable: false });
  };

  const handleActivity = e => {
    setState({ ...state, isDialogOpen: true });
  }

  const handleDialogClose = () => {
    setState({ ...state, isDialogOpen: false });
  }

  const handleImageError = (e) => {
    e.target.onerror = null;
    const name = e.target.name
    e.target.src = `https://via.placeholder.com/150/e6e6e6/000000?text=${name}`
  }

  const handleConnected = () => {
    const editedApplication = JSON.parse(JSON.stringify(application));
    editedApplication.connected = !application.connected
    editedApplication.isVisible = !editedApplication.connected
    editApplication(editedApplication);
  }

  const handlePermission = () => {
    setState({ ...state, editPermission: true })
  }

  const handlePermissionCancel = () => {
    setState({ ...state, editPermission: false })
  }

  const handlePermissionChanged = permissions => {
    const editedApplication = JSON.parse(JSON.stringify(application));
    editedApplication.permissions = permissions
    editedApplication.version = (1 + Number.parseInt(editedApplication.version)).toString()
    editApplication(editedApplication);
    setState({ ...state, editPermission: false })
  }

  const handleAuthorize = type => {
    const payload = generateData(type)
    if (type !== 'Update') {
      enableService(Object.keys(application.identifier)[0].toLowerCase())
    } else {
      const newUpdateIDs = updatedID.slice();
      const index = newUpdateIDs.indexOf(Object.keys(application.identifier)[0].toLowerCase())
      newUpdateIDs.splice(index, 1)
      updatedService(newUpdateIDs)
    }
    handleDialogClose()
    publishEvent(payload)
  }

  const generateData = type => {
    const readPermissions = application.permissions.map(value => {
      return value.read === true && `realestate/${value.name.toLowerCase()}`
    }).filter(Boolean)
    const writePermissions = application.permissions.map(value => {
      return value.write === true && `realestate/${value.name.toLowerCase()}`
    }).filter(Boolean)
    return {
      "topic": `yodata/subscription#${type === 'Authorize' ? 'authorize' : (type === 'Disconnect' ? 'revoke' : 'update')}`,
      "recipient": `${userData.profile_id}`,
      "data": {
        "type": `${type === 'Authorize' ? 'Authorize' : (type === 'Disconnect' ? 'Revoke' : 'Update')}Action`,
        "agent": `${userData.profile_id}`,
        "instrument": `https://forevercloudstore.${process.env.REACT_APP_HOSTNAME}`
        ,
        "object": {
          "type": "Subscription",
          "version": `${application.version}`,
          "agent": `${application.id}`,
          "instrument": `https://forevercloudstore.${process.env.REACT_APP_HOSTNAME}`,
          "host": `https://${userData.contact_id}.${process.env.REACT_APP_HOSTNAME}`,
          "subscribes": readPermissions,
          "publishes": writePermissions
        }
      }
    }
  }

  return (
    <React.Fragment>
      {
        state.isEditable ?
          (
            <NewApp isEditMode={state.isEditable}
              application={application}
              editApplication={editApplication}
              handleCancel={handleCancel} />
          ) : (
            <React.Fragment>
              <Grid container direction='column' alignItems="flex-start" justify='flex-start'>
                <Grid item>
                  <Card elevation={3} className={classes.root}>
                    {isAdmin &&
                      <>
                        <Grid className={classes.connectedApp} container direction='row' alignItems='center' justify='flex-start'>
                          <Grid item>
                            <Checkbox
                              checked={application.connected}
                              icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                              checkedIcon={<CheckBoxOutlinedIcon style={{ color: 'black' }} fontSize="small" />}
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
                          onClick={handleVisibility}>
                          {!application.connected && application.isVisible ?
                            <Visibility />
                            :
                            <VisibilityOff />}
                        </IconButton>
                      </>
                    }
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
                      <Typography className={classes.vendorName} variant="h5" component="h2">
                        {application.name}
                      </Typography>
                      <Typography variant="body2">
                        {application.description}
                      </Typography>
                    </CardContent>
                    {!isAdmin &&
                      <CardActions>
                        <Grid container direction='row' alignItems="center" justify="space-between">
                          <Grid className={classes.cardActions} spacing={1} item container direction='row' alignItems="center" justify="flex-start">
                            <Grid item variant='body1'>
                              {enabledID?.includes(Object.keys(application.identifier)[0].toLowerCase()) &&
                                <Typography className={classes.success}>Connected</Typography>}
                            </Grid>
                            <Grid item>
                              {enabledID?.includes(Object.keys(application.identifier)[0].toLowerCase()) &&
                                (!updatedID?.includes(Object.keys(application.identifier)[0].toLowerCase()) ?
                                  <CheckCircleIcon className={classes.success} />
                                  :
                                  <ErrorIcon className={classes.error} />)
                              }
                            </Grid>
                          </Grid>
                          <Grid item>
                            {enabledID?.includes(Object.keys(application.identifier)[0].toLowerCase()) ?
                              (!updatedID?.includes(Object.keys(application.identifier)[0].toLowerCase()) ?
                                <Button name="setting" variant="outlined" onClick={handleActivity} disableElevation>
                                  Settings
                                </Button> :
                                <Button className={classes.updateRequired} name="update" variant="contained" onClick={handleActivity} disableElevation>
                                  Update Required
                                </Button>) :
                              <Button className={classes.connectButton} name="connect" variant="contained" onClick={handleActivity} disableElevation>
                                Connect
                              </Button>
                            }
                          </Grid>
                        </Grid>
                      </CardActions>
                    }
                  </Card>
                </Grid>
                {isAdmin &&
                  <Grid item className={classes.adminGrid} container direction='row' justify='flex-end'>
                    {!application.connected &&
                      <Grid item>
                        <Button
                          className={classes.adminButtons}
                          variant="contained"
                          onClick={handlePermission}
                        >
                          Edit Permission
                          </Button>
                      </Grid>
                    }
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
                }
              </Grid>
              <Permissions open={state.editPermission}
                handleDialog={handlePermissionCancel}
                permissions={application.permissions}
                logo={application.logo.url}
                handlePermissionChanged={handlePermissionChanged} />
              <PermissionDialog open={state.isDialogOpen}
                handleDialog={handleDialogClose}
                application={application}
                handleAuthorize={handleAuthorize}
                type={enabledID?.includes(Object.keys(application.identifier)[0].toLowerCase()) ? (!updatedID?.includes(Object.keys(application.identifier)[0].toLowerCase()) ? 'Disconnect' : 'Update') : 'Authorize'} />
            </React.Fragment>
          )
      }
    </React.Fragment >
  );
}
const mapStateToProps = state => {
  return {
    enabledID: state.services.enabledID,
    updatedID: state.services.updatedID,
    userData: state.auth.userData,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    enableService: id => dispatch(serviceEnabled(id)),
    updatedService: id => dispatch(serviceUpdated(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CardComponent));