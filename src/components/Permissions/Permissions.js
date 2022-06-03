import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import Tooltip from "@material-ui/core/Tooltip";
import TableRow from "@material-ui/core/TableRow";
import WarningIcon from "@material-ui/icons/Warning";
import {
  Switch,
  Button,
  Dialog,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Typography,
} from "@material-ui/core";
import isEqual from "lodash.isequalwith";
import theme from "../../theme/theme";

const styles = (theme) => ({
  image: {
    padding: 20,
    objectFit: "contain",
  },
  dialogPaper: {
    minWidth: "45vw",
    maxWidth: "45vw",
    minHeight: "70vh",
    maxHeight: "70vh",
  },
  textSpacing: {
    paddingBottom: 10,
    paddingLeft: 12,
    paddingRight: 12,
  },
  table: {
    minWidth: "37vw",
    maxWidth: "37vw",
  },
  toggleSwitch: {
    backgroundColor: theme.palette.success.main,
    color: "#ffffff",
    "&:hover": {
      backgroundColor: theme.palette.success.main,
    },
  },
  cancelButton: {
    backgroundColor: theme.palette.error.main,
    color: "#ffffff",
    textTransform: "none",
    "&:hover": {
      backgroundColor: theme.palette.error.main,
    },
  },
  radioLabels: {
    fontWeight: "bold",
  },
  radioLabelHeader: {
    fontWeight: "bold",
    paddingRight: 10,
  },
  new: {
    backgroundColor: theme.palette.new.main,
    textTransform: "none",
    "&:disabled": {
      color: "black",
    },
  },
  warning: {
    color: theme.palette.warning.main,
  },
});

const TopicSwitch = withStyles((theme) => ({
  switchBase: {
    color: theme.palette.white.main,
    "&$checked": {
      transform: "translateX(12px)",
      color: theme.palette.white.main,
      "& + $track": {
        opacity: 1,
        backgroundColor: theme.palette.success.main,
      },
    },
  },
  track: {
    opacity: 1,
    backgroundColor: theme.palette.error.main,
  },
  checked: {},
}))(Switch);

function Permissions(props) {
  const {
    classes,
    permissions,
    handleDialog,
    open,
    logo,
    handlePermissionChanged,
    applicationAccessLevel,
    application,
    username
  } = props;

  const reduxState = useSelector((state) => ({
    topicLabels: state.topic.topicLabels,
  }));

  const [state, setState] = React.useState({
    localPermission: JSON.parse(JSON.stringify(permissions)),
  });

  const [accessLevel, setAccessLevel] = React.useState(applicationAccessLevel);
  const [accessLevelInfo, setAccessLevelInfo] = React.useState({
    modifiedBy: application.accessModifiedBy,
    lastModified: application?.accessModifiedDate
  });

  const handleCancel = () => {
    setState({
      localPermission: JSON.parse(JSON.stringify(permissions))
    })
    setAccessLevel(applicationAccessLevel)
    setAccessLevelInfo({
      modifiedBy: application.accessModifiedBy,
      lastModified: application?.accessModifiedDate
    })
    handleDialog();
  };

  const handleChange = (e) => {
    const type = e.target.name.split("-");
    const newPermissions = JSON.parse(JSON.stringify(state.localPermission));
    const index = newPermissions.findIndex((ele) => ele.name === type[0]);
    if (type[1] === "read") {
      newPermissions[index].read = !newPermissions[index].read;
      setState({ ...state, localPermission: newPermissions });
    } else {
      newPermissions[index].write = !newPermissions[index].write;
      setState({ ...state, localPermission: newPermissions });
    }
  };

  const updateVersion = () => {
    const newPermissions = JSON.parse(JSON.stringify(state.localPermission));
    for (let i = 0; i < permissions.length; i++) {
      if (!isEqual(state.localPermission[i], permissions[i])) {
        newPermissions[i].version++;
      }
    }
    setState({ ...state, localPermission: newPermissions });
    return newPermissions;
  };

  const handleSave = () => {
    const newPermissions = updateVersion();
    handlePermissionChanged(newPermissions, accessLevel, accessLevelInfo);
  };
  return (
    <>
      <Dialog
        open={open}
        onClose={handleCancel}
        classes={{ paper: classes.dialogPaper }}
        scroll="paper"
      >
        <Grid
          className={classes.root}
          container
          direction="column"
          justify="center"
          alignItems="center"
        >
          <Grid item xs={12}>
            <Paper elevation={0} className={classes.image}>
              <img alt="app logo" src={logo} width="250" />
            </Paper>
          </Grid>
          <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="center"
            item
            className={classes.textSpacing}
          >
            <Grid item>
              <Typography
                className={classes.radioLabelHeader}
                align="center"
                variant="subtitle2"
              >
                Apply to:
              </Typography>
            </Grid>
            <Grid item>
              <FormControl>
                <RadioGroup
                  row
                  color="black"
                  name="controlled-radio-buttons-group"
                  value={accessLevel}
                  onChange={(event) => {
                    setAccessLevelInfo({
                      modifiedBy: username,
                      lastModified: Date.now()
                    })
                    setAccessLevel(event.target.value)}}
                >
                  <FormControlLabel
                    size="small"
                    value="franchisees"
                    control={
                      <Radio size="small" color={theme.palette.black.main} />
                    }
                    label={
                      <Typography
                        className={classes.radioLabels}
                        align="center"
                        variant="subtitle2"
                      >
                        Franchisees
                      </Typography>
                    }
                  />
                  <FormControlLabel
                    value="agent"
                    control={
                      <Radio size="small" color={theme.palette.black.main} />
                    }
                    label={
                      <Typography
                        className={classes.radioLabels}
                        align="center"
                        variant="subtitle2"
                      >
                        Agents/Teams
                      </Typography>
                    }
                  />
                  <FormControlLabel
                    value="both"
                    control={
                      <Radio size="small" color={theme.palette.black.main} />
                    }
                    label={
                      <Typography
                        className={classes.radioLabels}
                        align="center"
                        variant="subtitle2"
                      >
                        Both
                      </Typography>
                    }
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
          <Grid item className={classes.textSpacing}>
            <TableContainer>
              <Table className={classes.table} size="small">
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell align="right">
                      <Button
                        variant="outlined"
                        disabled
                        disableRipple
                        className={classes.new}
                      >
                        Publish
                      </Button>
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        variant="outlined"
                        disabled
                        disableRipple
                        className={classes.new}
                      >
                        Subcscribe
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {state.localPermission.map((topic) => {
                    if (
                      reduxState.topicLabels[
                        topic?.name?.toLowerCase().replaceAll(/\s/g, "")
                      ]?.isLabelEnabled ||
                      (!reduxState.topicLabels[
                        topic?.name?.toLowerCase().replaceAll(/\s/g, "")
                      ]?.isLabelEnabled &&
                        (topic.read || topic.write))
                    ) {
                      return (
                        <TableRow key={topic.name}>
                          <TableCell>
                            <Grid
                              container
                              direction="row"
                              wrap="nowrap"
                              spacing={1}
                            >
                              <Grid item>
                                <Typography>{topic.name}</Typography>
                              </Grid>
                              <Grid item>
                                {!reduxState.topicLabels[
                                  topic?.name
                                    ?.toLowerCase()
                                    .replaceAll(/\s/g, "")
                                ]?.isLabelEnabled && (
                                    <Tooltip
                                      title={`This app is configured to send|receive events on a hidden topic. The topic will be visible to users who authorize this app.`}
                                    >
                                      <WarningIcon className={classes.warning} />
                                    </Tooltip>
                                  )}
                              </Grid>
                            </Grid>
                          </TableCell>
                          <TableCell align="right">
                            <TopicSwitch
                              size="small"
                              checked={topic.write}
                              name={topic.name + "-write"}
                              onChange={handleChange}
                            />
                          </TableCell>
                          <TableCell align="right">
                            <TopicSwitch
                              size="small"
                              checked={topic.read}
                              name={topic.name + "-read"}
                              onChange={handleChange}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    }
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid
            className={classes.textSpacing}
            item
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid item>
              <Button
                className={classes.cancelButton}
                name="cancel"
                onClick={handleCancel}
                disableElevation
              >
                CANCEL
              </Button>
            </Grid>
            <Grid item>
              <Button
                className={classes.toggleSwitch}
                name="save"
                onClick={handleSave}
                disableElevation
              >
                Save
              </Button>
            </Grid>
          </Grid>
          {/* <Grid container item justify='center'>
                        <Button className={classes.cancelButton} name="cancel" onClick={handleCancel} disableElevation>
                            Deactivate & remove vendor
                        </Button>
                    </Grid> */}
        </Grid>
      </Dialog>
    </>
  );
}

export default withStyles(styles)(Permissions);
