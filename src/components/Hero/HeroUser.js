import React from 'react';
import Paper from '@material-ui/core/Paper'
import { HeaderUser } from '../Header'
import { withStyles, Button, Grid } from '@material-ui/core';
import { history } from '../Authentication/history';
import { API } from '../../api/apiRequest'
import endpoints from '../../api/endpoints'
import { useSelector, useDispatch } from 'react-redux'
import { authorisedUserList } from '../../redux/actions/authenticationActions'
import { userSubscriptions } from '../../redux/actions/subscriptionAction'
import TextField from '@material-ui/core/TextField'

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
    }
});

function HeroUser(props) {

    const { classes } = props
    const state = useSelector(state => ({ id: state.auth.userId, userList: state.auth.userList }))
    const dispatch = useDispatch()
    //const [user, setUser] = React.useState(0)
    React.useEffect(() => {
        dispatch(authorisedUserList())
    }, [])

    const switchUI = () => {
        history.push('/admin');
    }

    // const handleChange = e => {
    //     setUser(e.currentTarget.value)
    // }

    // const handleSubmit = () => {
    //     dispatch(userSubscriptions(user))
    // }

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
                </Grid>
                <HeaderUser />
            </Paper>
        </>
    )
}

export default withStyles(styles)(HeroUser)