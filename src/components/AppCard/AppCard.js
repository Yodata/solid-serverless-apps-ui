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
import { setProfileId, getOrganizationData } from "../../redux/actions/authenticationActions";
import {
  serviceEnabled,
  serviceUpdated,
} from "../../redux/slices/servicesSlice";
import { useDispatch } from "react-redux";
import ManageTopics from "../manageTopics";
import Reports from "../Reports";
import { Typography } from "@material-ui/core";

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
    backgroundColor: theme.palette.new.main,
    "&:hover": {
      backgroundColor: theme.palette.new.main,
    },
  },
  reports: {
    paddingRight: 86.1,
    paddingLeft: 86.1,
    marginBottom: 20,
    backgroundColor: theme.palette.new.main,
    "&:hover": {
      backgroundColor: theme.palette.new.main,
    },
  },
  noAppsText: {
    color: 'red',
    marginLeft: 'calc(100% / 4)',
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
    name,
    role
  } = props;

  let count = 0;
  let length;
  const dispatch = useDispatch();

  React.useEffect(() => {
    console.log({ role })
    console.log({ roleName })
    if (franchiseList?.length > 0) {
      if (roleName === "self" || role === "self") {
        const findSelfIndex = franchiseList?.findIndex(x => x.type === 'self')
        setProfileId(franchiseList[findSelfIndex]?.profileId);
      } else if (roleName === "team" || role === "team") {
        const findTeamIndex = franchiseList?.findIndex(x => x.type === 'team')
        setProfileId(franchiseList[findTeamIndex]?.profileId);
      } else {
        console.log({ role })
        console.log({ roleName })
        const findOragnizationIndex = franchiseList?.findIndex(x => x.type === 'organization') !== -1 ? franchiseList?.findIndex(x => x.type === 'organization') : franchiseList?.findIndex(x => x.type === 'team')
        setProfileId(franchiseList[findOragnizationIndex]?.profileId);
      }
      userSubscriptions();
      dispatch(getOrganizationData());
    } else {
      userSubscriptions();
    }
  }, [userList, franchiseList]);

  const [isNew, setNew] = React.useState(false);
  const [openManageTopics, setOpenManageTopics] = React.useState(false);
  const [openReports, setOpenReports] = React.useState(false);

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
              <Grid item>
                <Button
                  variant="contained"
                  disableElevation
                  className={classes.reports}
                  onClick={() => setOpenReports(true)}
                >
                  REPORTS
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
                username={name}
              />
            </Grid>
          )}
          {sortApplications().map((application, index, array) => {
            length = array.length;
            if (
              application.isVisible &&
              (isFranchiseUser ||
                (localStore &&
                  application.accessLevel !== "franchisees" &&
                  localStore.find((x) => x.id === application.id)
                    ?.isFranchiseVisible))
            ) {
              // count = index + 1;
              // console.log(count)
              return (
                <Grid className={classes.app} item key={application.name}>
                  <Card
                    application={application}
                    isAdmin={isAdmin}
                    updateApplication={updateApplication}
                  />
                </Grid>
              );
            } else {
              // console.log(index)
              // count = array?.length - 1 === index ? count ?? 0 : null;
              // console.log(count)
              count++
              return (
                isAdmin && (
                  <Grid className={classes.app} item key={application.name}>
                    <Card
                      application={application}
                      isAdmin={isAdmin}
                      updateApplication={updateApplication}
                    />
                  </Grid>
                )
              );
            }
            // return (
            //   <>
            //     {application.isVisible &&
            //     (isFranchiseUser ||
            //       (localStore &&
            //         application.accessLevel !== "franchisees" &&
            //         localStore.find((x) => x.id === application.id)
            //           ?.isFranchiseVisible)) ? (
            //       <Grid className={classes.app} item key={application.name}>
            //         <Card
            //           application={application}
            //           isAdmin={isAdmin}
            //           updateApplication={updateApplication}
            //         />
            //       </Grid>
            //     ) : (
            //       isAdmin && (
            //         <Grid className={classes.app} item key={application.name}>
            //           <Card
            //             application={application}
            //             isAdmin={isAdmin}
            //             updateApplication={updateApplication}
            //           />
            //         </Grid>
            //       )
            //     )}
            //   </>
            // );
          })}
          {!isAdmin && count === length &&
            <Typography className={classes.noAppsText}>
              Oh no, your broker hasn't selected any apps yet for the App
              Exchange. Please contact your Office Manager for assistance.
            </Typography>
          }
        </Grid>
      </Grid>
      <ManageTopics
        open={openManageTopics}
        applications={applications}
        handleDialog={setOpenManageTopics}
      />
      <Reports
        open={openReports}
        applications={applications}
        handleDialog={setOpenReports}
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
    name: state.auth.name
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
