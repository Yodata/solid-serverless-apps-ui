import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Card from '../../components/Cards';
import { getAllApps, addNewApp } from '../../redux/actions/applicationActions';
import NewApp from '../NewApp';
import API from '../../api/apiRequest';
import endpoint from '../../api/endpoints';
import { updateApp } from '../../redux/actions/applicationActions';

/**
 * @Component AppCard
 * @Description This component will load all the application
 */

function AppCard(props) {

    const { tabIndex, applications, getApps, admin, addApp, editApp} = props;

    React.useEffect(() => {
        getApps();
    }, [getApps]);

    const getApplications = (group = 'featured') => {
        return applications ? applications.filter(function (app) {
            let result = false
            if (app && app.group) {
                result = app.group.includes(group)
            }
            return result
        }) : [];
    };

    const addNewApplication = value => {
        value.group.push(tabIndex);
        const idArray = applications.map(app => {
            return Number.parseInt(Object.values(app.identifier)[0]);
        });
        const maxId = Math.max(...idArray);
        const idName = value.name + "_id";
        Object.defineProperty(value.identifier, idName, {
            value: maxId + 1
        })
        addApp(value);
    }

    const updateApplication = app => {
        editApp(app);
    };

    return (
        <React.Fragment>
            <Grid container justify='space-around'>
                <Grid item xs={12} style={{ maxWidth: '960px' }}>
                    <Grid container spacing={5} alignItems="center">
                        {getApplications(tabIndex).map(application => (
                            <Grid item key={application.name} sm={12} md={6} lg={4}>
                                <Card application={application}
                                    isAdmin={admin} 
                                    updateApplication={updateApplication}/>
                            </Grid>
                        ))}
                        {admin &&
                            <Grid item sm={12} md={6} lg={4}>
                                <NewApp
                                    tabIndex={tabIndex}
                                    application={{}}
                                    addNewApp={addNewApplication} />
                            </Grid>
                        }
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment >
    );
}

const mapStateToProps = state => {
    return {
        tabIndex: state.groups.tabIndex,
        applications: state.apps.appList && state.apps.appList.application
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getApps: () => dispatch(getAllApps()),
        addApp: value => dispatch(addNewApp(value)),
        editApp: value => dispatch(updateApp(value))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppCard);