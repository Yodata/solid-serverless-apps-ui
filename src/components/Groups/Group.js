import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import StarBorder from '@material-ui/icons/StarBorder';
import Contacts from '@material-ui/icons/Contacts';
import ContactMail from '@material-ui/icons/ContactMail';
import GroupWork from '@material-ui/icons/GroupWork';
import Button from '@material-ui/core/Button';
import { setGroup } from '../../redux/slices/groupsSlice';
import { signoutUser } from '../../redux/actions/authenticationActions';

/**
 * @Component Group
 * @Description It shows the groups which are available to the user
 */

const styles = theme => ({
    appBar: {
        marginBottom: '2em'
    }
});

export function Group(props) {

    const { classes, tabIndex, setTabIndex, logoutUser } = props;
    const groups = [{ 'Featured': <StarBorder /> }, { 'CRM': <Contacts /> }, { 'Marketing': <ContactMail /> }, { 'Paperless': <GroupWork /> }];
    Object.freeze(groups);

    const handleLogout = () => {
        logoutUser();
    }

    return (
        <React.Fragment>
            <AppBar position='static' className={classes.appBar} flex='row'>
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
                </Tabs>
                <Button onClick={handleLogout} color="secondary">
                    Logout
                </Button>
            </AppBar>
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