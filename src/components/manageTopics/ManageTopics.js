import React from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import withStyles from "@material-ui/core/styles/withStyles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Switch, Button, Dialog, Typography } from "@material-ui/core";
import isEqual from "lodash.isequalwith";
import { setTopicLabel } from "../../redux/slices/topicSlice";
import { updateStoreWithTopic } from "../../redux/actions/applicationActions";

const styles = (theme) => ({
  image: {
    padding: 20,
    objectFit: "contain",
  },
  dialogPaper: {
    minWidth: "50vw",
    maxWidth: "50vw",
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
  new: {
    // backgroundColor: theme.palette.new.main,
    textTransform: "none",
    "&:disabled": {
      color: "black",
      fontWeight: "bold",
    },
  },
  label: {
    width: 150,
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

function ManageTopics(props) {
  const { classes, permissions, handleDialog, open, logo, applications } =
    props;
  const state = useSelector((state) => ({
    topicLabels: state.topic.topicLabels,
  }));

  const dispatch = useDispatch();
  const handleToggleChange = (e) => {
    const type = e.target.name;
    const newTopicLabels = {
      topic: {
        ...state.topicLabels,
        [type]: {
          ...state.topicLabels[type],
          isLabelEnabled: !state.topicLabels[type].isLabelEnabled,
        },
      },
    };
    dispatch(setTopicLabel(newTopicLabels));
  };

  const handleLabelChange = (e) => {
    const type = e.target.name;
    const value = e.target.value;
    const newTopicLabels = {
      topic: {
        ...state.topicLabels,
        [type]: {
          ...state.topicLabels[type],
          label: value,
        },
      },
    };
    dispatch(setTopicLabel(newTopicLabels));
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={() => handleDialog(false)}
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
          <Grid item className={classes.textSpacing}>
            <TableContainer>
              <Table className={classes.table} size="small">
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell align="right">
                      <Button
                        variant="text"
                        disabled
                        disableRipple
                        className={classes.new}
                      >
                        Include In App Exchange
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="text"
                        disabled
                        disableRipple
                        className={classes.new}
                      >
                        App Exchange Label
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.entries(state.topicLabels)
                    .sort((a, b) => a[0].localeCompare(b[0]))
                    .map((topic) => (
                      <TableRow key={topic[0]}>
                        <TableCell>{topic[1].name}</TableCell>
                        <TableCell align="center">
                          <TopicSwitch
                            size="small"
                            checked={topic[1].isLabelEnabled}
                            name={topic[0]}
                            onChange={handleToggleChange}
                          />
                        </TableCell>
                        <TableCell align="right">
                          <TextField
                            className={[classes.new, classes.label]}
                            disabled={!topic[1].isLabelEnabled}
                            size="small"
                            variant="outlined"
                            hiddenLabel
                            style={{ paddingTop: 0 }}
                            name={topic[0]}
                            onChange={handleLabelChange}
                            value={topic[1].label}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
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
            <Typography className={classes.textSpacing}>
            Topics that share the same label will be displayed in the App Exchange as a single entry.
            </Typography>
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
                onClick={() => handleDialog(false)}
                disableElevation
              >
                CANCEL
              </Button>
            </Grid>
            <Grid item>
              <Button
                className={classes.toggleSwitch}
                name="save"
                onClick={() => {
                  dispatch(updateStoreWithTopic());
                  handleDialog(false);
                }}
                disableElevation
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
}

export default withStyles(styles)(ManageTopics);
