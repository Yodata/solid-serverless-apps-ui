import React from 'react';
import Paper from '@material-ui/core/Paper'
import { HeaderUser } from '../Header'
import { withStyles, Button, Grid, Typography } from '@material-ui/core';
import { history } from '../Authentication/history';
import endpoint from '../../api/endpoints'
import { useSelector, useDispatch } from 'react-redux'
import { authorisedUserList, setProfileId } from '../../redux/actions/authenticationActions'
import { userSubscriptions } from '../../redux/actions/subscriptionAction'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem';
import { serviceEnabled, serviceUpdated } from '../../redux/slices/servicesSlice';
import Toast from '../Toast'

const styles = theme => ({
    adminButton: {
        position: 'absolute',
        top: 0,
        right: 0,
        paddingBottom: 10
    },
    switchUser: {
        position: 'absolute',
        top: 30,
        right: 0
    },
    switchButton: {
        position: 'absolute',
        top: 60,
        right: 0
    },
    userText: {
        maxWidth: 150,
        minWidth: 150,
    },
    resize: {
        fontSize: 16
    }
});

function HeroUser(props) {

    const { classes } = props
    const state = useSelector(state => ({
        id: state.auth.userId,
        userList: state.auth.userList,
        franchiseList: state.auth.franchiseList,
        success: state.toast.success
    }))

    const dispatch = useDispatch()
    const [user, setUser] = React.useState(0)
    const [franchiseUser, setFranchiseUser] = React.useState('')
    const [toastOpen, setToastOpen] = React.useState(false)

    React.useEffect(() => {
        dispatch(authorisedUserList())
    }, [])

    const switchUI = () => {
        history.push('/admin');
    }

    const handleChange = e => {
        setUser(e.currentTarget.value)
    }

    const handleSubmit = () => {
        dispatch(setProfileId(`https://${user}.${process.env.REACT_APP_HOSTNAME}/${endpoint.profile}`))
        dispatch(serviceEnabled(false))
        dispatch(serviceUpdated())
        dispatch(userSubscriptions(user))
        setToastOpen(true)
    }

    const handleSelect = e => {
        const value = e.target.value === '' ? state.franchiseList[0].contactId : e.target.value
        setFranchiseUser(e.target.value)
        dispatch(setProfileId(value))
        dispatch(serviceEnabled(false))
        dispatch(serviceUpdated())
        dispatch(userSubscriptions())
    }

    const handleToastClose = () => {
        setToastOpen(false)
    }

    return (
        <>
            <Paper elevation={0}>
                <Grid container direction='column' className={classes.adminButton} alignItems='flex-end'>
                    {state.userList.some(ele => ele.contactId === state.id) &&
                        <Grid item>
                            <Button
                                onClick={switchUI}>
                                Switch to admin UI
                            </Button>
                        </Grid>
                    }
                    {
                        state.userList.some(ele => ele.contactId === state.id && ele.roleName) ?
                            (
                                <>
                                    <Grid item>
                                        <Typography style={{ fontSize: '10px' }}>Enter Contact ID</Typography>
                                        <TextField
                                            margin="dense"
                                            variant="outlined"
                                            className={classes.userText}
                                            onChange={handleChange}
                                            defaultValue={state.id}
                                            InputProps={{
                                                classes: {
                                                    input: classes.resize,
                                                },
                                            }} />
                                    </Grid>
                                    <Grid item>
                                        <Button
                                            className={classes.userText}
                                            onClick={handleSubmit}>
                                            Submit
                                        </Button>
                                    </Grid>
                                </>
                            )
                            :
                            (state.franchiseList?.length > 1 &&
                                (<Grid item>
                                    <Typography style={{ fontSize: '10px' }}>Select Contact ID</Typography>
                                    <Select
                                        value={franchiseUser}
                                        onChange={handleSelect}
                                        displayEmpty
                                    >
                                        <MenuItem value="">
                                            <Typography>
                                                {state.franchiseList[0].contactId.split("//").pop().split(".").shift().toUpperCase()}
                                            </Typography>
                                        </MenuItem>
                                        {state.franchiseList.map((ele, index) => {
                                            if (index > 0) {
                                                const value = ele.contactId.split("//").pop().split(".").shift()
                                                return (
                                                    <MenuItem value={value}>
                                                        <Typography>
                                                            {value.toUpperCase()}
                                                        </Typography>
                                                    </MenuItem>
                                                )
                                            }
                                        })}
                                    </Select>
                                </Grid>)
                            )
                    }
                </Grid>
                <HeaderUser />
                <Toast open={toastOpen}
                    handleToastClose={handleToastClose} 
                    message={state.success ? 'Subscriptions are updated' : 'No subscriptions present' }
                    type={state.success ? 'success' : 'error'}/>
            </Paper>
        </>
    )
}

export default withStyles(styles)(HeroUser)