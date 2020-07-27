import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
// import AppBar from '@material-ui/core/AppBar';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';
// import StarBorder from '@material-ui/icons/StarBorder';
// import Contacts from '@material-ui/icons/Contacts';
// import ContactMail from '@material-ui/icons/ContactMail';
// import GroupWork from '@material-ui/icons/GroupWork';
// import Button from '@material-ui/core/Button';
import { setGroup } from '../../redux/slices/groupsSlice';
import { signoutUser } from '../../redux/actions/authenticationActions';

/**
 * @Component Group
 * @Description It shows the groups which are available to the user
 */

const styles = theme => ({
    appBar: {
        marginBottom: '2em'
    },
    logout: {
        paddingRight:'10px',
        paddingLeft:'10px',
        marginBottom:'20px',
        textTransform: 'none'
    },
    new: {
        paddingRight:'40px',
        paddingLeft:'40px',
        marginBottom:'20px',
        backgroundColor: theme.palette.new.main,
        textTransform: 'none'
    }
});

export function Group(props) {

    // // const { classes, tabIndex, setTabIndex, logoutUser } = props;
    // const { classes, logoutUser, isAdmin } = props;
    // // const groups = [{ 'Featured': <StarBorder /> }, { 'CRM': <Contacts /> }, { 'Marketing': <ContactMail /> }, { 'Paperless': <GroupWork /> }];
    // // Object.freeze(groups);

    // const handleLogout = () => {
    //     logoutUser();
    // }

    return (
        <React.Fragment>
            {/* <Grid container direction='row' justify='flex-end' alignItems='center'>
                {/* <AppBar position='static' className={classes.appBar} flex='row'>
                <Tabs
                    value={tabIndex}
                    centered
                    onChange={(event, value) => {
                        setTabIndex(value);
                    }}

                >
                    {groups.map(value => (
                        <Tab
                            key={Object.keys(value)[0]}
                            label={Object.keys(value)[0]}
                            icon={Object.values(value)[0]}
                            value={(Object.keys(value)[0]).toLowerCase()} />
                    ))}
                </Tabs> */}
                {/* <Grid item>
                    {isAdmin &&
                        <Button variant='outlined' className={classes.new} onClick={handleLogout}>
                            Add New Application
                        </Button>
                    }
                </Grid>
                <Grid item>
                    <Button className={classes.logout} onClick={handleLogout}>
                        Logout
                    </Button>
                </Grid>
            </Grid>
            </AppBar> */}
        </React.Fragment>
    );
}

const mapStateToProps = state => {
    return {
        tabIndex: state.groups.tabIndex
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setTabIndex: value => dispatch(setGroup(value)),
        logoutUser: () => dispatch(signoutUser())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Group));