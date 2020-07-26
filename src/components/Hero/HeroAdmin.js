import React from 'react';
import { connect } from 'react-redux';
import {HeaderAdmin} from '../Header';
import { withStyles } from '@material-ui/core';

/**
 * @Component Hero
 * @Description This component shows the custom header color and logo for each user
 */

const styles = theme => ({
    heroUnit: {
        marginBottom: '2em'
    }
});

function HeroAdmin(props) {

    const { classes, userCustomization } = props;

    return (
        <React.Fragment>
            <HeaderAdmin
                className={classes.heroUnit}
                title='ForeverCloud App Exchange'
                content='Select the apps you want to use.'
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