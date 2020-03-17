import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

function CheckList(props) {

    const { classes, permissions } = props;
    return (
        <CardContent>
            <Typography variant='caption' >REQUESTS ACCESS TO:</Typography>
            <List dense>
                {permissions.map(permission => (
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
    );
}

export default CheckList;