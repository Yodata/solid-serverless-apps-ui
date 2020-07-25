import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Card from '../../components/Cards';
import Button from '@material-ui/core/Button'
import { getAllApps, addNewApp } from '../../redux/actions/applicationActions';
import NewApp from '../NewApp';
import { updateApp } from '../../redux/actions/applicationActions';
import withStyles from '@material-ui/core/styles/withStyles';

/**
 * @Component AppCard
 * @Description This component will load all the application
 */

const styles = theme => ({
    root:{
        paddingTop: 72,
        paddingLeft: '5vw',
    },
    app: {
        paddingRight: '5vw',
        paddingBottom: '10vh'
    },
    new: {
        paddingRight: '40px',
        paddingLeft: '40px',
        marginBottom: '20px',
        backgroundColor: theme.palette.new.main,
        '&:hover': {
            backgroundColor: theme.palette.new.main,
          }
    }
});

function AppCard(props) {

    const { classes, tabIndex, applications = [], getApps, isAdmin, addApp, editApp } = props;

    React.useEffect(() => {
        getApps();
    }, [getApps]);

    const [isNew, setNew] = React.useState(false)
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

    const handleNew = () => {
        setNew(true)
    }

    const handleCancel = () => {
        setNew(false)
    }

    return (
        <React.Fragment>
            <Grid container direction='column' alignItems='flex-end'>
                <Grid item>
                    {isAdmin &&
                        <Button variant='outlined' className={classes.new} onClick={handleNew}>
                            Add New Application
                        </Button>
                    }
                </Grid>
                <Grid className={classes.root} container item direction='row' >
                    {isAdmin && isNew &&
                        <Grid item>
                            <NewApp
                                isAddNew={isNew}
                                tabIndex={tabIndex}
                                application={{}}
                                addNewApp={addNewApplication}
                                handleCancel={handleCancel} />
                        </Grid>
                    }
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
                </Grid>
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