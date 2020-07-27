import React from 'react'
import { connect } from 'react-redux'

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
import { Typography } from '@material-ui/core';

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
                theme.palette.error.main),
        '&:hover': {
            backgroundColor: props => props.type === 'Authorize' ?
                theme.palette.success.main :
                (props.type === 'Update' ?
                    theme.palette.update.main :
                    theme.palette.error.main),
        },
        marginBottom: 10
    },
    headerRow: {
        color: theme.palette.purple.main,

    },
    firstMsg: {
        fontSize: '0.7em',
        maxWidth: 310,
        lineHeight: '1em',
        fontFamily: [
            'ProximaNovaBold',
            'Roboto'
        ].join(',')
    },
    secondMsg: {
        fontSize: '0.7em',
        maxWidth: 200,
        lineHeight: '1em',
    },
    typeButton: {
        maxWidth: '60%'
    }
})


function DialogBox(props) {
    const { classes, open, handleDialog, application, type, apps, globalSubs, handleAuthorize } = props

    const handleClose = () => {
        handleDialog()
    }

    const handleType = () => {
        handleAuthorize(type)
    }

    const connectedApps = application.permissions.map(topic => {
        if (topic.read || topic.write) {
            const subsIdentifier = globalSubs?.items?.map(value => {
                if (value.object.split('/').pop().toLowerCase() === topic.name.toLowerCase()) {
                    return `${value.agent.split('/')[2].split('.').shift()}_id`
                }
            })
            const images = subsIdentifier?.map(sub => {
                return apps.forEach(app => {
                    if (Object.keys(app.identifier)[0] === sub) {
                        return app.logo.url
                    }
                })
            })
            return { [topic.name.toLowerCase()]: images }
        }
        return {}
    })


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
                            <Table className={classes.table} size='small'>
                                <TableHead className={classes.headerRow}>
                                    <TableRow>
                                        <TableCell>Data Flow</TableCell>
                                        <TableCell>Data</TableCell>
                                        <TableCell align="right">Connected Applications</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {application.permissions?.map(topic => (
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
                                                            {connectedApps && connectedApps.map(app => {
                                                                if (topic === Object.keys(app)[0]) {
                                                                    return app.topic.map(img => (
                                                                        <img alt='connected application'
                                                                            src={img}
                                                                            width='50' />
                                                                    ))
                                                                }
                                                            })
                                                            }
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
                    <Grid item>
                        <Typography gutterBottom className={classes.firstMsg} align='center' variant='subtitle2'>
                            To add additional Connected Applications, authorize this
                            vendor and return to the AppExchange to repeat this proces
                        </Typography>
                    </Grid>
                    <Grid className={classes.textSpacing} item container direction='row' justify='space-between' alignItems='flex-start'>
                        <Grid item>
                            <Button name="cancel" variant="outlined" onClick={handleClose}>
                                cancel
                          </Button>
                        </Grid>
                        <Grid className={classes.typeButton} container item direction='column' justify='space-evenly' alignItems='flex-end' >
                            <Grid item>
                                <Button className={classes.actionButton} name="submit" variant="contained" onClick={handleType} disableElevation>
                                    {type}
                                </Button>
                            </Grid>
                            <Grid item>
                                <Typography className={classes.secondMsg} align='right' variant='subtitle2'>
                                    {`By clicking ${type} you agree to enable
                                    data sharing between this vendor and the
                                    connected applications depicted above.`}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>

                </Grid>
            </Dialog>
        </React.Fragment >
    );
}

const mapStateToProps = state => {
    return {
        globalSubs: state.subs.globalSubs,
        apps: state.apps?.storeData?.application
    };
};

export default connect(mapStateToProps)(withStyles(styles)(DialogBox))