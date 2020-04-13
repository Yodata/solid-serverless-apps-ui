import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Collapse from '@material-ui/core/Collapse'
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Switch from '@material-ui/core/Switch';
import CardActions from '@material-ui/core/CardActions';
import CheckList from '../Checklist';
import Button from '@material-ui/core/Button';

import NewApp from '../NewApp';
import { serviceEnabled, serviceExpanded } from '../../redux/slices/servicesSlice';

/**
 * @Component Card
 * @Description This component shows each individual card of the each app
 */

const styles = theme => ({
  cardMedia: {
    paddingTop: '56.25%',
    backgroundSize: '56.25%',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  },
  cardContent: {
    height: '155px'
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between'
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
  }
});

export function CardComponent(props) {

  const [isEditable, setEditable] = React.useState(false);
  const { classes, application, enableService, expandService,
    enabledID, expandedID, isAdmin, updateApplication } = props
  const handleSwitchToggle = async () => {
    enableService(application.id);
  };
  const handleExpandClick = () => {
    expandService(application.id);
  };

  const handleEdit = () => {
    setEditable(true);
  };

  const editApplication = app => {
    updateApplication(app);
    setEditable(false);
  };

  return (
    <React.Fragment>
      {
        isEditable ?
          (
            <NewApp isEditMode={isEditable}
              application={application}
              editApplication={editApplication} />
          ) : (
            <React.Fragment>
              <Card>
                <CardMedia
                  className={classes.cardMedia}
                  image={application.logo.url}
                  title={application.name}
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {application.name}
                  </Typography>
                  <Typography variant="body2">
                    {application.description}
                  </Typography>
                </CardContent>
                <Grid container spacing={5} alignItems="center">
                  <Grid item sm={12} md={6} lg={4}>
                    <CardActions className={classes.actions}>
                      <Switch checked={enabledID.includes(application.id)} onClick={handleSwitchToggle} />
                      <Typography>{enabledID.includes(application.id) && 'CONNECTED'}</Typography>
                    </CardActions>
                  </Grid>
                  <Grid item sm={12} md={6} lg={4}>
                    <CardActions>
                      <IconButton
                        style={{ display: 'none' }}
                        className={classNames(classes.expand, {
                          [classes.expandOpen]: expandedID.includes(application.id),
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expandedID.includes(application.id)}
                        aria-label="Show permissions"
                      >
                        <ExpandMoreIcon />
                      </IconButton>
                    </CardActions>
                  </Grid>
                </Grid>
                <Collapse in={expandedID.includes(application.id)} timeout="auto" unmountOnExit>
                  <CheckList permissions={application.permissions} />
                </Collapse>
              </Card>
              {isAdmin &&
                <Button className={classes.button}
                  variant="outlined"
                  color="secondary"
                  onClick={handleEdit}
                  fullWidth >
                  Edit App
              </Button>
              }
            </React.Fragment>
          )
      }
    </React.Fragment>
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