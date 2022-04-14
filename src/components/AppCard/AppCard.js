import React from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Card from "../../components/Cards";
import Button from "@material-ui/core/Button";
import { getAllApps, addNewApp } from "../../redux/actions/applicationActions";
import NewApp from "../NewApp";
import { updateApp } from "../../redux/actions/applicationActions";
import withStyles from "@material-ui/core/styles/withStyles";
import { userSubscriptions } from "../../redux/actions/subscriptionAction";
import { setProfileId } from "../../redux/actions/authenticationActions";
import {
  serviceEnabled,
  serviceUpdated,
} from "../../redux/slices/servicesSlice";
import ManageTopics from "../manageTopics";

/**
 * @Component AppCard
 * @Description This component will load all the application
 */

const styles = (theme) => ({
  root: {
    // paddingTop: 72,
    paddingLeft: "2vw",
  },
  app: {
    paddingRight: "2vw",
    paddingBottom: "5vh",
  },
  new: {
    paddingRight: "40px",
    paddingLeft: "40px",
    backgroundColor: theme.palette.new.main,
    "&:hover": {
      backgroundColor: theme.palette.new.main,
    },
  },
  manageTopics: {
    paddingRight: 62,
    paddingLeft: 62,
    marginBottom: "20px",
    backgroundColor: theme.palette.new.main,
    "&:hover": {
      backgroundColor: theme.palette.new.main,
    },
  },
});

function AppCard(props) {
  const {
    classes,
    tabIndex,
    applications = [],
    isAdmin,
    addApp,
    editApp,
    userSubscriptions,
    userList,
    franchiseList,
    userId,
    setProfileId,
    localStore,
    isFranchiseUser,
    roleName,
  } = props;

  React.useEffect(() => {
    if (franchiseList?.length > 0) {
      if (roleName === "self") {
        setProfileId(franchiseList[franchiseList.length - 1].profileId);
      } else {
        setProfileId(franchiseList[0].profileId);
      }
      userSubscriptions();
    } else {
      userSubscriptions();
    }
  }, [userList, franchiseList]);

  const [isNew, setNew] = React.useState(false);
  const [openManageTopics, setOpenManageTopics] = React.useState(false);

  const sortApplications = () => {
    return [...applications].sort((a, b) => {
      return a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1;
    });
  };

  const addNewApplication = (value) => {
    value.group.push(tabIndex);
    const idArray = applications.map((app) => {
      return Number.parseInt(Object.values(app.identifier)[0]);
    });
    const maxId = idArray.length > 0 ? Math.max(...idArray) : 0;
    const idName = `${value.id.split("/")[2].split(".")[0]}_id`.toLowerCase();
    value.identifier[idName] = maxId + 1;
    addApp(value);
  };

  const updateApplication = (app) => {
    editApp(app);
  };

  const handleNew = () => {
    setNew(true);
  };

  const handleCancel = () => {
    setNew(false);
  };

  return (
    <React.Fragment>
      <Grid container direction="column" alignItems="flex-end">
        <Grid item>
          {isAdmin && (
            <Grid container direction="column">
              <Grid item>
                <Button
                  variant="contained"
                  disableElevation
                  className={classes.new}
                  onClick={handleNew}
                >
                  Add New Application
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  disableElevation
                  className={classes.manageTopics}
                  onClick={() => setOpenManageTopics(true)}
                >
                  MANAGE TOPICS
                </Button>
              </Grid>
            </Grid>
          )}
        </Grid>
        <Grid className={classes.root} container item direction="row">
          {isAdmin && isNew && (
            <Grid item className={classes.app}>
              <NewApp
                isAddNew={isNew}
                tabIndex={tabIndex}
                application={{}}
                addNewApp={addNewApplication}
                handleCancel={handleCancel}
              />
            </Grid>
          )}
          {sortApplications().map((application) => (
            <>
              {application.isVisible &&
              (isFranchiseUser ||
                (localStore &&
                  application.accessLevel !== "franchisees" &&
                  localStore.find((x) => x.id === application.id)
                    ?.isFranchiseVisible)) ? (
                <Grid className={classes.app} item key={application.name}>
                  <Card
                    application={application}
                    isAdmin={isAdmin}
                    updateApplication={updateApplication}
                  />
                </Grid>
              ) : (
                isAdmin && (
                  <Grid className={classes.app} item key={application.name}>
                    <Card
                      application={application}
                      isAdmin={isAdmin}
                      updateApplication={updateApplication}
                    />
                  </Grid>
                )
              )}
            </>
          ))}
        </Grid>
      </Grid>
      <ManageTopics
        open={openManageTopics}
        applications={applications}
        handleDialog={setOpenManageTopics}
      />
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    tabIndex: state.groups.tabIndex,
    applications: state.apps?.storeData && state.apps?.storeData?.application,
    globalSubs: state.subs.globalSubs,
    userList: state.auth.userList,
    franchiseList: state.auth.franchiseList,
    userId: state.auth.userId,
    localStore: state.apps?.localStoreData?.application,
    isFranchiseUser: state.auth.isFranchiseUser,
    roleName: state.role.roleName,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getApps: () => dispatch(getAllApps()),
    addApp: (value) => dispatch(addNewApp(value)),
    editApp: (value) => dispatch(updateApp(value)),
    userSubscriptions: () => dispatch(userSubscriptions()),
    setProfileId: (value) => dispatch(setProfileId(value)),
    serviceEnabled: (value) => dispatch(serviceEnabled(value)),
    serviceUpdated: () => dispatch(serviceUpdated()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AppCard));
