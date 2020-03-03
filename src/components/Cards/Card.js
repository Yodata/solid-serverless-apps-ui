// @ts-nocheck
import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Collapse from '@material-ui/core/Collapse'
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Switch from '@material-ui/core/Switch'
import CardActions from '@material-ui/core/CardActions'
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
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
})

function AppCard(props) {

  const { classes, application, enableService, expandeService } = props
  const handleSwitchToggle = () => {
    enableService(application.id);
  };
  const handleExpandClick = () => {
    expandeService(application.id);
  };

  return (
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
      <CardActions className={classes.actions}>
        <Switch checked={props.enabled} onClick={handleSwitchToggle} />
        <Typography>{props.enabled && props.enabledID == application.id && 'CONNECTED'}</Typography>
        <IconButton
          className={classNames(classes.expand, {
            [classes.expandOpen]: props.expanded && props.expandedID == application.id,
          })}
          onClick={handleExpandClick}
          aria-expanded={props.expanded}
          aria-label="Show permissions"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={props.expanded && props.expandedID == application.id} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant='caption' >REQUESTS ACCESS TO:</Typography>
          <List dense>
            {application.permissions.map(permission => (
              <ListItem key={permission.id} dense className={classes.ListItem}>
                <FormControlLabel
                  control={<Checkbox
                    className={classes.checkbox}
                    checked={permission.checked}
                    tabIndex={-1}
                    disableRipple
                  />}
                  label={permission.description}
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Collapse>
    </Card >
  );
}
const mapStateToProps = state => {
  return {
    expanded: state.services.expanded,
    enabled: state.services.enabled,
    expandedID: state.services.expandedID,
    enabledID: state.services.enabledID
  };
};

const mapDispatchToProps = dispatch => {
  return{
    enableService: id => dispatch(serviceEnabled(id)),
    expandeService: id => dispatch(serviceExpanded(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AppCard));