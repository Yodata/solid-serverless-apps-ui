import React from 'react';
import { connect } from 'react-redux';
import Header from '../../components/Header';
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

function Hero(props) {

    const { classes, userCustomization } = props;

    return (
        <React.Fragment>
            <Header
                className={classes.heroUnit}
                title='ForeverCloud App Exchange'
                content='Select the apps you want to use.'
                backgroundImage={userCustomization && userCustomization.userLogo}
                backgroundColor={userCustomization && userCustomization.userBackground}>
            </Header>
        </React.Fragment>
    );
}

const mapStateToProps = state => {
    return {
        userCustomization: state.apps.storeData && state.apps.storeData.userCustomization
    };
};

export default connect(mapStateToProps)(withStyles(styles)(Hero));