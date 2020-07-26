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
import { serviceEnabled, serviceExpanded } from '../../redux/slices/servicesSlice';
import { Checkbox } from '@material-ui/core';

/**
 * @Component Card
 * @Description This component shows each individual card of the each app
 */

const styles = theme => ({
  root: {
    position: 'relative',
    backgroundColor: theme.palette.invisible.main,
    // backgroundColor: props => (!props.application.isVisible && theme.palette.invisible.main),
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
  // expand: {
  //   transform: 'rotate(0deg)',
  //   marginLeft: 'auto',
  //   transition: theme.transitions.create('transform', {
  //     duration: theme.transitions.duration.shortest,
  //   })
  // },
  // expandOpen: {
  //   transform: 'rotate(180deg)',
  // },
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
    paddingRight: '1.9vw',
    paddingLeft: '1.9vw',
    backgroundColor: theme.palette.adminButtons.main,
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
  const { classes, application, isAdmin, updateApplication, isConnected = false, isUpdated=true } = props

  const handleEdit = () => {
    setState({ ...state, isEditable: true });
  };

  const handleCancel = () => {
    setState({ ...state, isEditable: false });
  }

  const handleVisibility = () => {
    const editedApplication = JSON.parse(JSON.stringify(application));
    editedApplication.isVisible = !application.isVisible;
    editApplication(editedApplication);
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
    e.target.src = "https://via.placeholder.com/150"
  }

  const handleConnected = () => {
    handleVisibility()
    const setValue = !state.isConnected
    setState({ ...state, isConnected: setValue })
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
    editApplication(editedApplication);
    setState({ ...state, editPermission: false })
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
                          {application.isVisible ?
                            <Visibility />
                            :
                            <VisibilityOff />}
                        </IconButton>
                      </>
                    }
                    <CardMedia
                      component="img"
                      height="140"
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
                              {isConnected &&
                                <Typography className={classes.success}>Connected</Typography>}
                            </Grid>
                            <Grid item>
                              {isConnected &&
                                (isUpdated ?
                                  <CheckCircleIcon className={classes.success} />
                                  :
                                  <ErrorIcon className={classes.error} />)
                              }
                            </Grid>
                          </Grid>
                          <Grid item>
                            {isConnected ?
                              (isUpdated ?
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
                    {!state.isConnected &&
                      <Grid item>
                        <Button
                          className={classes.adminButtons}
                          variant="outlined"
                          onClick={handlePermission}
                        >
                          Edit Permission
                          </Button>
                      </Grid>
                    }
                    <Grid item>
                      <Button
                        className={classes.adminButtons}
                        variant="outlined"
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
                type={isConnected ? (isUpdated ? 'Disconnect' : 'Update') : 'Authorize'} />
            </React.Fragment>
          )
      }
    </React.Fragment >
  );
}
const mapStateToProps = state => {
  return {
    expandedID: state.services.expandedID,
    enabledID: state.services.enabledID
  };
};

const mapDispatchToProps = dispatch => {
  return {
    enableService: id => dispatch(serviceEnabled(id)),
    expandService: id => dispatch(serviceExpanded(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CardComponent));