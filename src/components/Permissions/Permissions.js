import React from 'react';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import withStyles from '@material-ui/core/styles/withStyles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Switch, Button, Dialog } from '@material-ui/core';

const styles = theme => ({
    root: {
        // position: 'relative',
        // minWidth: 300,
        // maxWidth: 300,
        // // maxHeight: 350
    },
    dialogPaper: {
        minWidth: '50vw',
        maxWidth: '50vw',
        minHeight: '80vh',
        maxHeight: '80vh',
    },
    textSpacing: {

    },
    table: {
        minWidth: '47vw',
        maxWidth: '47vw',
    },
    toggleSwitch: {
        backgroundColor: theme.palette.success.main
    },
    cancelButton: {
        backgroundColor: theme.palette.error.main
    }
})


function Permissions(props) {

    const { classes, application, handleDialog, open } = props
    // const [state, setState] = React.useState({
    //     isRead: false,
    //     isWrite: false
    // });

    // const handleChange = 

    const createData = (name) => {
        const topic = application.permissions.find(value => value.name === name.toLowerCase())
        if (topic) {
            if (topic.modes.length === 2) {
                return { name, isRead: true, isWrite: true }
            }
            else
                if (topic.modes.includes('Write')) {
                    return { name, isRead: false, isWrite: true }
                }
                else {
                    return { name, isRead: true, isWrite: false }
                }
        }
        else {
            return { name, isRead: false, isWrite: false }
        }
    }

    const topics = ['Award', 'Calendar', 'Contact', 'Franchise Reporting', 'Lead', 'Listing',
        'Marketing Program', 'Service Area', 'Transaction', 'Website'];

    Object.freeze(topics)

    const rows = topics.map(createData)

    const handleCancel = () => {
        handleDialog()
    }

    return (
        <>
            <Dialog open={open} onClose={handleCancel} classes={{ paper: classes.dialogPaper }} scroll='paper'>
                <Grid className={classes.root} container direction='column' justify='center' alignItems='center'>
                    <Grid item xs={12} >
                        <Paper elevation={0} className={classes.image}>
                            <img alt='app logo' src={application.logo.url} width='250' />
                        </Paper>
                    </Grid>
                    <Grid item className={classes.textSpacing}>
                        Access Granted
                    </Grid>
                    <Grid item className={classes.textSpacing}>
                        <TableContainer>
                            <Table className={classes.table}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell></TableCell>
                                        <TableCell>Publish</TableCell>
                                        <TableCell>Subscribe</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map(topic => (
                                        <TableRow key={topic.name}>
                                            <TableCell>{topic.name}</TableCell>
                                            <TableCell>
                                                <Switch
                                                    // classes={iosStyles}
                                                    checked={topic.isRead}
                                                    name='topicSwitchPublish'
                                                    onChange={handle}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Switch
                                                    // classes={iosStyles}
                                                    checked={topic.isWrite}
                                                    name='topicSwitchSubscribe'
                                                    onChange={() => { }}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid className={classes.textSpacing} item container direction='row' justify='space-between' alignItems='center'>
                        <Grid item>
                            <Button className={classes.cancelButton} name="cancel" onClick={handleCancel} disableElevation>
                                cancel
                        </Button>
                        </Grid>
                        <Grid item>
                            <Button className={classes.toggleSwitch} name="save" onClick={() => { }} disableElevation>
                                Save
                        </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Dialog>
        </>

    )
}

export default withStyles(styles)(Permissions)