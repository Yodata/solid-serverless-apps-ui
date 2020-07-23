import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Card from '../../components/Cards';
import { getAllApps, addNewApp } from '../../redux/actions/applicationActions';
import NewApp from '../NewApp';
import { updateApp } from '../../redux/actions/applicationActions';
import withStyles from '@material-ui/core/styles/withStyles';
import Container from '@material-ui/core/Container';

/**
 * @Component AppCard
 * @Description This component will load all the application
 */

const styles = theme => ({
    app: {
        padding: 8
    },
    // appGrid: {
    //     paddingLeft: 40,
    //     paddingRight: 40
    // }
});

function AppCard(props) {

    const { classes, tabIndex, applications = [], getApps, isAdmin, addApp, editApp } = props;

    React.useEffect(() => {
        getApps();
    }, [getApps]);

    // const getApplications = (group = 'featured') => {
    //     return applications ? applications.filter(function (app) {
    //         let result = false
    //         if (app && app.group) {
    //             result = app.group.includes(group);
    //             if(!admin){
    //                 result = app.group.includes(group) && app.isVisible 
    //             }
    //         }
    //         return result
    //     }) : [];
    // };

    const addNewApplication = value => {
        value.group.push(tabIndex);
        const idArray = applications.map(app => {
            return Number.parseInt(Object.values(app.identifier)[0]);
        });
        const maxId = Math.max(...idArray);
        const idName = value.name + "_id";
        value.identifier[idName] = maxId + 1;
        addApp(value);
    }

    const updateApplication = app => {
        editApp(app);
    };

    return (
        <React.Fragment>
            <Grid item container direction='row' alignItems='center' justify='space-around'>
                {applications.map(application => (
                    <>
                        {application.isVisible ?
                            (<Grid className={classes.app} item key={application.name}>
                                <Card application={application}
                                    isAdmin={isAdmin}
                                    updateApplication={updateApplication} />
                            </Grid>
                            ) : (
                                isAdmin &&
                                (<Grid className={classes.app} item key={application.name}>
                                    <Card application={application}
                                        isAdmin={isAdmin}
                                        updateApplication={updateApplication} />
                                </Grid>
                                )
                            )
                        }
                    </>
                ))}
                {/* {isAdmin &&
                            <Grid item sm={12} md={6} lg={4}>
                                <NewApp
                                    tabIndex={tabIndex}
                                    application={{}}
                                    addNewApp={addNewApplication} />
                            </Grid>
                        } */}
            </Grid>
        </React.Fragment >
    );
}

const mapStateToProps = state => {
    return {
        tabIndex: state.groups.tabIndex,
        applications: state.apps.storeData && state.apps.storeData.application
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getApps: () => dispatch(getAllApps()),
        addApp: value => dispatch(addNewApp(value)),
        editApp: value => dispatch(updateApp(value))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AppCard));