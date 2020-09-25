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
import Tooltip from '@material-ui/core/Tooltip'
import Avatar from '@material-ui/core/Avatar';

const styles = theme => ({
    root: {

    },
    image: {
        padding: 30,
        objectFit: "contain"
    },
    dialogPaper: {
        minWidth: '60vw',
        maxWidth: '60vw',
        overflowX: 'hidden'
    },
    textSpacing: {
        paddingBottom: 20,
        paddingLeft: 20,
        paddingRight: 20
    },
    table: {
        minWidth: '57vw',
        maxWidth: '57vw',
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
        marginBottom: 20
    },
    headerRow: {
        color: theme.palette.purple.main,
    },
    firstMsg: {
        fontSize: '1em',
        maxWidth: 450,
        lineHeight: '1em',
        fontFamily: [
            'ProximaNovaBold',
            'Roboto'
        ].join(','),
        marginBottom: 30,
        marginTop: 10
    },
    secondMsg: {
        fontSize: '1em',
        maxWidth: 250,
        lineHeight: '1em',
    },
    typeButton: {
        maxWidth: '60%'
    },
    avatar: {
        color: theme.palette.purple.main,
        width: theme.spacing(3),
        height: theme.spacing(3),
    }
})

function DialogBox(props) {
    const { classes, open, handleDialog, application, type, allApplications,
        globalSubs, handleAuthorize, franchiseList, adminList, userId, userData, userSubs } = props

    const onlyReadRole = ['bc', 'owner', 'broker of record', 'marketing director']
    Object.freeze(onlyReadRole)

    const topicsToShow = ['Lead', 'Contact', 'Website']
    Object.freeze(topicsToShow)

    const handleClose = () => {
        handleDialog()
    }

    const handleType = () => {
        handleAuthorize(type)
    }

    const handleImageError = (e) => {
        e.target.onerror = null;
        const name = e.target.name
        return (
            <Avatar className={classes.avatar}>
                {name?.charAt(0).toUpperCase()}
            </Avatar>
        )
    }

    const getSubsIdentifier = (value, topic) => {
        if (!value.publishes && !value.subscribes) {
            if (value.object.includes(topic.name.toLowerCase())) {
                return `${value.agent}`
            }
        } else {
            if (topic.read && topic.write) {
                if (value.subscribes.find(value => value.includes(topic.name.toLowerCase())) &&
                    value.publishes.find(value => value.includes(topic.name.toLowerCase()))) {
                    return `${value.agent}`
                } else
                    if (value.subscribes.find(value => value.includes(topic.name.toLowerCase()))) {
                        return `${value.agent}?read`
                    } else
                        if (value.publishes.find(value => value.includes(topic.name.toLowerCase()))) {
                            return `${value.agent}?write`
                        }
            }
            else
                if (topic.write && !topic.read && value.subscribes.length > 0 &&
                    value.subscribes.find(value => value.includes(topic.name.toLowerCase()))) {
                    return `${value.agent}`
                } else
                    if (topic.read && !topic.write && value.publishes.length > 0 &&
                        value.publishes.find(value => value.includes(topic.name.toLowerCase()))) {
                        return `${value.agent}`
                    }

        }
    }

    const connectedApps = application.permissions.map(topic => {
        if (topic.read || topic.write) {
            const globalSubsIdentifier = globalSubs && globalSubs.items ? globalSubs.items.map(value => getSubsIdentifier(value, topic)).filter(Boolean) : []
            //value => {
            // if (!value.publishes && !value.subscribes) {
            //     if (value.object.includes(topic.name.toLowerCase())) {
            //         return `${value.agent}`
            //     }
            // } else {
            //     if (topic.read && topic.write) {
            //         if (value.subscribes.find(value => value.includes(topic.name.toLowerCase())) &&
            //             value.publishes.find(value => value.includes(topic.name.toLowerCase()))) {
            //             return `${value.agent}`
            //         } else
            //             if (value.subscribes.find(value => value.includes(topic.name.toLowerCase()))) {
            //                 return `${value.agent}?read`
            //             } else
            //                 if (value.publishes.find(value => value.includes(topic.name.toLowerCase()))) {
            //                     return `${value.agent}?write`
            //                 }
            //     }
            //     else
            //         if (topic.write && !topic.read && value.subscribes.length > 0 &&
            //             value.subscribes.find(value => value.includes(topic.name.toLowerCase()))) {
            //             return `${value.agent}`
            //         } else
            //             if (topic.read && !topic.write && value.publishes.length > 0 &&
            //                 value.publishes.find(value => value.includes(topic.name.toLowerCase()))) {
            //                 return `${value.agent}`
            //             }

            // }
            // ).filter(Boolean)
            const userSubsIdentifier = userSubs && userSubs.items ? userSubs.items.map(value => getSubsIdentifier(value, topic)).filter(Boolean) : []

            const subsIdentifier = [...globalSubsIdentifier, ...userSubsIdentifier]?.sort((a, b) => {
                return a.toUpperCase() > b.toUpperCase() ? 1 : -1
            })
            const connectedApplication = subsIdentifier?.map(sub => {
                const selectedApp = (allApplications.find(ele => ele.id === `${sub.split('?')[0]}`))
                return {
                    name: selectedApp ? selectedApp.name : sub.split('/')[2].split('.').shift(),
                    image: selectedApp?.logo?.url,
                    type: sub.split('?')[1]
                }
            }).filter(Boolean)
            return { [topic.name.toLowerCase()]: connectedApplication }
        }
        return null
    }).filter(Boolean)

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
                        {type !== 'Disconnect' ? 'REQUIRES ACCESS TO:' :
                            <Typography align='center' variant='body2'>
                                Revoking data access permissions for this application will disconnect the application from the following:
                            </Typography>
                        }
                    </Grid>
                    <Grid item className={classes.textSpacing}>
                        <TableContainer>
                            <Table className={classes.table} size='small'>
                                <TableHead className={classes.headerRow}>
                                    <TableRow>
                                        <TableCell>DATA FLOW</TableCell>
                                        <TableCell>DATA</TableCell>
                                        <TableCell align="right">CONNECTED APPLICATION</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {application.permissions?.map(topic => (
                                        <>
                                            {topicsToShow.includes(topic.name) &&
                                                ((!topic.read && !topic.write) ?
                                                    null : (
                                                        <TableRow key={topic.name}>
                                                            <TableCell component="th" scope="row">
                                                                {(topic.read && topic.write) ?
                                                                    'Send and Receive' : (
                                                                        topic.write ?
                                                                            'Send' :
                                                                            'Receive'
                                                                    )}
                                                            </TableCell>
                                                            <TableCell>{topic.name === 'Website' ? 'Website Customer Activity' : topic.name}</TableCell>
                                                            <TableCell align="right">
                                                                <>
                                                                    <Grid container direction='row' justify='flex-end' alignItems='center'>
                                                                        {connectedApps && connectedApps.map(app => {
                                                                            if (topic.name.toLowerCase() === (Object.keys(app)[0]).toLowerCase()) {
                                                                                return app[topic.name.toLowerCase()] && app[topic.name.toLowerCase()].map(value => (
                                                                                    <>
                                                                                        <Grid item>
                                                                                            <Tooltip title={!value.type ?
                                                                                                (`${application.name}
                                                                                    ${(topic.read && topic.write) ?
                                                                                                        'sends and receives' : (
                                                                                                            topic.write ?
                                                                                                                'sends' :
                                                                                                                'receives'
                                                                                                        )}
                                                                                    ${topic.name === 'Website' ? 'Website Customer Activity' : topic.name} data 
                                                                                    ${(topic.read && topic.write) ?
                                                                                                        'to/from' : (
                                                                                                            topic.write ?
                                                                                                                'to' :
                                                                                                                'from'
                                                                                                        )}
                                                                                    ${value.name.charAt(0).toUpperCase() + value.name.slice(1)}`
                                                                                                ) : (`${application.name}
                                                                                                ${value.type === 'write' ?
                                                                                                        'receives' :
                                                                                                        'sends'
                                                                                                    }
                                                                                                ${topic.name === 'Website' ? 'Website Customer Activity' : topic.name} data 
                                                                                                ${value.type === 'write' ?
                                                                                                        'from' :
                                                                                                        'to'
                                                                                                    }
                                                                                                ${value.name?.charAt(0).toUpperCase() + value.name?.slice(1)}`
                                                                                                )
                                                                                            }
                                                                                                arrow>

                                                                                                {value.image ?
                                                                                                    <img alt='connected application'
                                                                                                        src={value.image}
                                                                                                        width='70'
                                                                                                        name={value.name}
                                                                                                        onError={handleImageError} />
                                                                                                    :
                                                                                                    <Avatar className={classes.avatar}>
                                                                                                        {value.name?.charAt(0).toUpperCase()}
                                                                                                    </Avatar>
                                                                                                }
                                                                                            </Tooltip>
                                                                                        </Grid>
                                                                                    </>
                                                                                ))
                                                                            }
                                                                            return null
                                                                        })}
                                                                    </Grid>
                                                                </>
                                                            </TableCell>
                                                        </TableRow>
                                                    )
                                                )}
                                        </>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid item>
                        {type !== 'Disconnect' &&
                            <Typography className={classes.firstMsg} align='center' variant='subtitle2'>
                                To add additional Connected Applications, authorize this
                                vendor and return to the App Exchange to repeat this process.
                            </Typography>
                        }
                    </Grid>
                    <Grid className={classes.textSpacing} item container direction='row' justify='space-between' alignItems='flex-start'>
                        <Grid item>
                            <Button name="cancel" variant="outlined" onClick={handleClose}>
                                cancel
                          </Button>
                        </Grid>
                        <Grid className={classes.typeButton} container item direction='column' justify='space-evenly' alignItems='flex-end' >
                            <Grid item>
                                {userId === userData.contact_id ||
                                    franchiseList.some(ele => ele.contactId === userData.contact_id &&
                                        ele.roleName.toLowerCase() === 'app exchange admin') ||
                                    !(adminList.some(ele => ele.contactId === userId &&
                                        onlyReadRole.includes(ele.roleName.toLowerCase())) ||
                                        franchiseList.some(ele => ele.contactId === userData.contact_id &&
                                            onlyReadRole.includes(ele.roleName.toLowerCase()))) ?
                                    (
                                        <Button className={classes.actionButton} name="submit" variant="contained" onClick={handleType} disableElevation>
                                            {type}
                                        </Button>
                                    ) : (
                                        <Button disabled className={classes.actionButton} name="readOnlySubmit" variant="contained" disableElevation>
                                            {type}
                                        </Button>
                                    )
                                }
                            </Grid>
                            <Grid item>
                                <Typography className={classes.secondMsg} align='right' variant='subtitle2'>
                                    {`By clicking ${type} you agree to ${type !== 'Disconnect' ? 'enable' : 'disable'}
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
        userSubs: state.subs.userSubs,
        allApplications: state.apps?.storeData?.application,
        adminList: state.auth.userList,
        franchiseList: state.auth.franchiseList,
        userId: state.auth.userId,
        userData: state.auth.userData
    };
};

export default connect(mapStateToProps)(withStyles(styles)(DialogBox))