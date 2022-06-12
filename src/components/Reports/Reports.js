import React, { useState } from 'react';
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import { Switch, Button, Dialog, Typography, CircularProgress } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow"
import axios from 'axios';
import { saveAs } from "file-saver";



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
    title: {
        fontSize: 40,
        padding: 20
    }
});

const Reports = (props) => {
    const { classes, handleDialog, open } =
        props;
    const [adminLoading, setAdminLoading] = useState(false)
    const [vendorLoading, setVendorLoading] = useState(false)
    const [agentLoading, setAgentLoading] = useState(false)
    const [teamLoading, setTeamLoading] = useState(false)
    const [franchiseeLoading, setFranchiseeLoading] = useState(false)
    const donwloadReport = async (type, fileName) => {
        try {
            switch (type) {
                case 'admin':
                    setAdminLoading(true)
                    break;
                case 'vendor':
                    setVendorLoading(true)
                    break;
                case 'agent':
                    setAgentLoading(true)
                    break;
                case 'team':
                    setTeamLoading(true)
                    break;
                case 'franchisee':
                    setFranchiseeLoading(true)
                    break;
            }
            let response
            if (type === 'agent') {
                response = await axios.get(`https://asokutl5czzlxsqiw7rart6cm40qbwcl.lambda-url.us-west-2.on.aws/?a=${Math.random()}`, {
                    responseType: "arraybuffer",
                });
            } else {
                response = await axios.get(`https://lao1mbmhe9.execute-api.us-west-2.amazonaws.com/${type}?a=${Math.random()}`, {
                    responseType: "arraybuffer",
                });
            }
            const blob = new Blob([response.data], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });
            saveAs(blob, fileName);
            switch (type) {
                case 'admin':
                    setAdminLoading(false)
                    break;
                case 'vendor':
                    setVendorLoading(false)
                    break;
                case 'agent':
                    setAgentLoading(false)
                    break;
                case 'team':
                    setTeamLoading(false)
                    break;
                case 'franchisee':
                    setFranchiseeLoading(false)
                    break;
            }

        } catch (err) {
            console.log(err)
        }
    }
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
                    <Typography className={classes.title}>
                        ForeverCloud Report Access
                    </Typography>
                    <Grid item className={classes.textSpacing}>
                        <TableContainer>
                            <Table className={classes.table} size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            <Button
                                                variant="text"
                                                disabled
                                                disableRipple
                                                className={classes.new}
                                            >
                                                Report Name
                                            </Button>
                                        </TableCell>
                                        <TableCell align="center">
                                            {/* <Button
                                                variant="text"
                                                disabled
                                                disableRipple
                                                className={classes.new}
                                            >
                                                Download
                                            </Button> */}
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>
                                            <Button
                                                variant="text"
                                                disabled
                                                disableRipple
                                                className={classes.new}
                                            >
                                                Vendor-App Summary
                                            </Button>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Button
                                                variant="text"
                                                disableRipple
                                                className={classes.new}
                                                onClick={() => donwloadReport('admin', "Vendor-App Summary.xlsx")}
                                            >
                                                {adminLoading ? <CircularProgress size={20} /> : 'Download'}
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <Button
                                                variant="text"
                                                disabled
                                                disableRipple
                                                className={classes.new}
                                            >
                                                Vendor-App Data Sharing Details
                                            </Button>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Button
                                                variant="text"
                                                disableRipple
                                                className={classes.new}
                                                onClick={() => donwloadReport('vendor', "Vendor-App Data Sharing Details.xlsx")}
                                            >
                                                {vendorLoading ? <CircularProgress size={20} /> : 'Download'}
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <Button
                                                variant="text"
                                                disabled
                                                disableRipple
                                                className={classes.new}
                                            >
                                                Franchisee Data Sharing Details
                                            </Button>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Button
                                                variant="text"
                                                disableRipple
                                                className={classes.new}
                                                onClick={() => donwloadReport('franchisee', "Franchisee Data Sharing Details.xlsx")}
                                            >
                                                {franchiseeLoading ? <CircularProgress size={20} /> : 'Download'}
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <Button
                                                variant="text"
                                                disabled
                                                disableRipple
                                                className={classes.new}
                                            >
                                                Agent Data Sharing Details
                                            </Button>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Button
                                                variant="text"
                                                disableRipple
                                                className={classes.new}
                                                onClick={() => donwloadReport('agent', "Agent Data Sharing Details.xlsx")}
                                            >
                                                {agentLoading ? <CircularProgress size={20} /> : 'Download'}
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <Button
                                                variant="text"
                                                disabled
                                                disableRipple
                                                className={classes.new}
                                            >
                                                Team Data Sharing Details
                                            </Button>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Button
                                                variant="text"
                                                disableRipple
                                                className={classes.new}
                                                onClick={() => donwloadReport('team', "Team Data Sharing Details.xlsx")}
                                            >
                                                {teamLoading ? <CircularProgress size={20} /> : 'Download'}
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <Button
                                                variant="text"
                                                disabled
                                                disableRipple
                                                className={classes.new}
                                            >
                                                Data Volume By Vendor
                                            </Button>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Button
                                                variant="text"
                                                disableRipple
                                                disabled
                                                className={classes.new}
                                            // onClick={() => window.open(process.env.REACT_APP_VENDOR_VOLUME_REPORT, '_blank')}

                                            >
                                                Open
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <Button
                                                variant="text"
                                                disabled
                                                disableRipple
                                                className={classes.new}
                                            >
                                                Data Volume By Franchisee
                                            </Button>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Button
                                                variant="text"
                                                disableRipple
                                                disabled
                                                className={classes.new}
                                            // onClick={() => window.open(process.env.REACT_APP_FRANCHISE_VOLUME_REPORT, '_blank')}
                                            >
                                                Open
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid
                        className={classes.textSpacing}
                        item
                        container
                        direction="row"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Grid item>
                            <Button
                                className={classes.cancelButton}
                                name="cancel"
                                onClick={() => handleDialog(false)}
                                disableElevation
                            >
                                CLOSE
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Dialog>
        </>
    )

}

export default withStyles(styles)(Reports);