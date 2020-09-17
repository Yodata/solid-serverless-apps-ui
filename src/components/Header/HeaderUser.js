import React from 'react'
// import logo from '../../assets/images/logoForeverCloud.png'
import Grid from '@material-ui/core/Grid'
import withStyles from '@material-ui/core/styles/withStyles';
// import { Typography } from '@material-ui/core';

const styles = theme => ({
    root: {
        // paddingTop: 60,
        paddingRight: '5vw',
        paddingLeft: '5vw',
        paddingBottom: 20
    },
    image: {
        maxWidth: 550,
        width: '100%',
        height: 'auto',
        paddingBottom: 50
    },
})

function HeaderUser(props) {

    const { classes } = props

    return (
        <>
            <Grid className={classes.root} container direction='column' alignItems='center' justify='center'>
                <Grid item>
                    {/* <img className={classes.image} alt='Header Logo' src={logo} /> */}
                </Grid>
                <Grid item>
                    {/* <Typography align='center' variant='body2'>
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi
                        enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem , vel illum dolore eu
                        feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.
                        Lorem ipsum dolor sit amet, cons ectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut
                        wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Lorem n ullamcorper suscipit
                        lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eugait nulla facilisi.
                    </Typography> */}
                </Grid>
            </Grid>
        </>
    )
}

export default withStyles(styles)(HeaderUser)