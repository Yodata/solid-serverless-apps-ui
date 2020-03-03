import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Card from '../../components/Cards';
import { getAllApps } from '../../redux/actions/applicationActions';

/**
 * @Component AppCard
 * @Description This component will load all the application
 */

function AppCard(props) {

    const { tabIndex, applications, getApps } = props;

    React.useEffect(() => {
      getApps();
    }, []);

    const getApplications = (group = 'featured') => {
        return applications ? applications.filter(function (app) {
            let result = false
            if (app && app.group) {
                result = app.group.includes(group)
            }
            return result
        }) : [];
    };

    return (
        <React.Fragment>
            <Grid container justify='space-around'>
                <Grid item xs={12} style={{ maxWidth: '960px' }}>
                    <Grid container spacing={5} alignItems="center">
                        {getApplications(tabIndex).map(application => (
                            <Grid item key={application.name} sm={12} md={6} lg={4}>
                                <Card application={application} />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

const mapStateToProps = state => {
    return {
        tabIndex: state.groups.tabIndex,
        applications: state.apps.appList
    }
}

const mapDispatchToProps = dispatch => {
    return {
      getApps: () => dispatch(getAllApps())
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(AppCard);