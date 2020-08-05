import React from 'react';
import Paper from '@material-ui/core/Paper'
import { HeaderUser } from '../Header'
import { withStyles, Button, Grid, Typography } from '@material-ui/core';
import { history } from '../Authentication/history';
import { API } from '../../api/apiRequest'
import endpoints from '../../api/endpoints'
import { useSelector, useDispatch } from 'react-redux'
import { authorisedUserList, franchiseUserList, setProfileId } from '../../redux/actions/authenticationActions'
import { userSubscriptions } from '../../redux/actions/subscriptionAction'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem';
import { serviceEnabled, serviceUpdated } from '../../redux/slices/servicesSlice';

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
        franchiseList: state.auth.franchiseList
    }))
    const dispatch = useDispatch()
    const [user, setUser] = React.useState(0)
    const [franchiseUser, setFranchiseUser] = React.useState(state.id)
    React.useEffect(() => {
        dispatch(authorisedUserList())
        dispatch(franchiseUserList())
    }, [])

    const switchUI = () => {
        history.push('/admin');
    }

    const handleChange = e => {
        setUser(e.currentTarget.value)
    }

    const handleSubmit = () => {
        dispatch(setProfileId(`https://${user}.dev.env.yodata.io/profile/card`))
        dispatch(serviceEnabled(false))
        dispatch(serviceUpdated())
        dispatch(userSubscriptions(user))
    }

    const handleSelect = e => {
        setFranchiseUser(e.target.value)
        dispatch(setProfileId(e.target.value))
        dispatch(serviceEnabled(false))
        dispatch(serviceUpdated())
        dispatch(userSubscriptions())
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
                            (state.franchiseList.length > 0 &&
                                (<Grid item>
                                    <Typography style={{ fontSize: '10px' }}>Select Contact ID</Typography>
                                    <Select
                                        value={franchiseUser}
                                        onChange={handleSelect}
                                        displayEmpty
                                    >
                                        <MenuItem value={state.id}>
                                            <Typography>{state.id}</Typography>
                                        </MenuItem>
                                        {state.franchiseList.map(ele => {
                                            const value = ele.contactId.split("//").pop().split(".").shift()
                                            return (
                                                <MenuItem value={ele.contactId}>{value}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                </Grid>)
                            )
                    }
                </Grid>
                <HeaderUser />
            </Paper>
        </>
    )
}

export default withStyles(styles)(HeroUser)