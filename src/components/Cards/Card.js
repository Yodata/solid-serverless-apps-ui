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
    backgroundColor: props => (!props.application.isVisible && theme.palette.invisible.main),
    minWidth: 300,
    maxWidth: 300
  },
  cardMedia: {
    padding: 10,
    objectFit: "contain",
  },
  cardContent: {
    height: '155px'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)',
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
    color: '#ffffff'
  },
  update: {
    color: theme.palette.update.main
  },
  adminButtons: {
    paddingRight: 17.5,
    paddingLeft: 17.5,
    backgroundColor: theme.palette.adminButtons.main,
    textTransform: 'none'
  },
  adminGrid: {
    minWidth: 300,
    maxWidth: 300
  },
  connectedApp: {
    maxHeight: 20
  }
});

export function CardComponent(props) {

  // const [isEditable, setEditable] = React.useState(false);
  // const [isDialogOpen, setDialog] = React.useState(false);
  const [state, setState] = React.useState({
    isEditable: false,
    isDialogOpen: false,
    isConnected: false,
    editPermission: false
  })
  const { classes, application, isAdmin, updateApplication, isConnected = true, isUpdated = true } = props

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
    // const type = e.currentTarget.name
    // setDialog(true);
    setState({ ...state, isDialogOpen: true });
  }

  const handleDialogClose = () => {
    // setDialog(false);
    setState({ ...state, isDialogOpen: false });
  }

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = "https://via.placeholder.com/150"
  }

  const handleConnected = () => {
    const setValue = !state.isConnected
    setState({ ...state, isConnected: setValue })
  }

  const handlePermission = () => {
    setState({ ...state, editPermission: true })
  }

  const handlePermissionCancel = () => {
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
                  <Card className={classes.root}>
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
                      <Typography gutterBottom variant="h5" component="h2">
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
                            <Grid item>
                              {isConnected &&
                                (isUpdated ?
                                  <CheckCircleIcon className={classes.success} />
                                  :
                                  <ErrorIcon className={classes.error} />)
                              }
                            </Grid>
                            <Grid item>
                              {isConnected &&
                                <Typography className={classes.success}>Connected</Typography>}
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
                              <Button name="connect" variant="contained" onClick={handleActivity} disableElevation>
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
              <Permissions open={state.editPermission} handleDialog={handlePermissionCancel} application={application} />
              <PermissionDialog open={state.isDialogOpen} handleDialog={handleDialogClose} application={application}
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