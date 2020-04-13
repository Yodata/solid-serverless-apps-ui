import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 280,
        height: '100%',
        backgroundColor: theme.palette.background.paper,
    }
});

function CheckList(props) {

    const { classes, permissions } = props;
    return (
        <CardContent className={classes.root}>
            <Typography variant='caption' >REQUESTS ACCESS TO:</Typography>
            <List dense>
                {permissions.map(permission => (
                    <ListItem key={permission.id} dense className={classes.root}>
                        <FormControlLabel
                            control={<Checkbox
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
    );
}

export default withStyles(styles)(CheckList);