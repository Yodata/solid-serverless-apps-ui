import React from 'react'

import Dialog from '@material-ui/core/Dialog'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import withStyles from '@material-ui/core/styles/withStyles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    root: {

    },
    image: {
        padding: 30,
        objectFit: "contain"
    },
    dialogPaper: {
        minWidth: '50vw',
        maxWidth: '50vw',
        minHeight: '80vh',
        maxHeight: '80vh',
    },
    textSpacing: {
        paddingBottom: 20,
        paddingLeft: 20,
        paddingRight: 20
    },
    table: {
        minWidth: '47vw',
        maxWidth: '47vw',
    },
    actionButton: {
        color: '#ffffff',
        backgroundColor: props => props.type === 'Authorize' ?
            theme.palette.success.main :
            (props.type === 'Update' ?
                theme.palette.update.main :
                theme.palette.error.main)
    }
})


function DialogBox(props) {
    const { classes, open, handleDialog, application, type } = props

    const handleClose = () => {
        handleDialog()
    }

    const handleType = type => ({})

    return (
        <React.Fragment>
            <Dialog open={open} onClose={handleClose} classes={{ paper: classes.dialogPaper }} scroll='paper'>
                <Grid container direction='column' justify='center' alignItems='center'>
                    <Grid item xs={12} >
                        <Paper elevation={0} className={classes.image}>
                            <img alt='app logo' src={application.logo.url} width='250' />
                        </Paper>
                    </Grid>
                    <Grid item className={classes.textSpacing}>
                        Requires access to
                    </Grid>
                    <Grid item className={classes.textSpacing}>
                        <TableContainer>
                            <Table className={classes.table}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Data Flow</TableCell>
                                        <TableCell>Data</TableCell>
                                        <TableCell align="right">Connected Applications</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {application.permissions.map(topic => (
                                        <>
                                            {(!topic.read && !topic.write) ?
                                                null : (
                                                    <TableRow key={topic.name}>
                                                        <TableCell component="th" scope="row">
                                                            {(topic.read && topic.write) ?
                                                                'Send and Recieve' : (
                                                                    topic.write ?
                                                                        'Send' :
                                                                        'Recieve'
                                                                )}
                                                        </TableCell>
                                                        <TableCell>{topic.name}</TableCell>
                                                        <TableCell align="right">
                                                            {<img alt='connected application' src='https://www.reliancenetwork.com/reliancenetwork/img/logo.png' width={80} />}
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            }
                                        </>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid className={classes.textSpacing} item container direction='row' justify='space-between' alignItems='center'>
                        <Grid item>
                            <Button name="cancel" variant="outlined" color="primary" onClick={handleClose}>
                                cancel
                          </Button>
                        </Grid>
                        <Grid item>
                            <Button className={classes.actionButton} name="submit" variant="contained" onClick={handleType} disableElevation>
                                {type}
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Dialog>
        </React.Fragment >
    );
}

export default withStyles(styles)(DialogBox)