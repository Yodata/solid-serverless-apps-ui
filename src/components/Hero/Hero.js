import React from 'react';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import { withStyles } from '@material-ui/core';
import { getCustomization } from '../../redux/actions/applicationActions';

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

    const { classes, userCustomization, getCustomization } = props;

    React.useEffect(() => {
        getCustomization();
    }, [getCustomization])

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
        userCustomization: state.apps.userCustomization
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getCustomization: () => dispatch(getCustomization())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Hero));