import React from 'react';
import { connect } from 'react-redux';
import { HeaderAdmin } from '../Header';
import { withStyles, Button } from '@material-ui/core';
import { history } from '../Authentication/history';

/**
 * @Component Hero
 * @Description This component shows the custom header color and logo for each user
 */

const styles = theme => ({
    heroUnit: {
        marginBottom: '2em'
    },
    adminButton: {
        position: 'absolute',
        top: 0,
        right: 0,
        color: theme.palette.white.main
    }
});

function HeroAdmin(props) {

    const { classes, userCustomization } = props;

    const switchUI = () => {
        history.push('/');
    }

    return (
        <React.Fragment>
            <Button className={classes.adminButton}
            onClick={switchUI}>
                Switch to User UI
            </Button>
            <HeaderAdmin
                className={classes.heroUnit}
                title='FOREVER CLOUD APP EXCHANGE'
                content='ADMIN'
                backgroundImage={userCustomization && userCustomization.userLogo}
                backgroundColor={userCustomization && userCustomization.userBackground}>
            </HeaderAdmin>
        </React.Fragment>
    );
}

const mapStateToProps = state => {
    return {
        userCustomization: state.apps.storeData && state.apps.storeData.userCustomization
    };
};

export default connect(mapStateToProps)(withStyles(styles)(HeroAdmin));