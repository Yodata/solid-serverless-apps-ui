import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import logoBH from '../../assets/images/logoBH.png'

/**
 * @Component Header
 * @Description This component is the header of all the views
 */

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    heroBackGround: {
        backgroundColor: theme.palette.purple.main,
        color: 'white'
    },
    heroContent: {
        margin: '0 auto',
        padding: `${theme.spacing(5)}px 0 ${theme.spacing(2)}px`
    }
});

export function Header(props) {
    const { classes, title, content, backgroundImage } = props;
    return (
        <Grid container className={classes.root} justify='center' alignItems='center'>
            <Grid item xs={2}>
                <img src={logoBH} alt='logo' />
            </Grid>
            <Grid item xs={10}>
                <div className={classes.heroBackGround}>
                    <div className={classes.heroContent}>
                        <Typography className={classes.title}
                            component="h3"
                            variant="h3"
                            align="center"
                            color="inherit"
                            >
                            {title}
                        </Typography>
                        <Typography align="center"
                            color="inherit"
                            paragraph
                            variant="h5">
                            {content}
                        </Typography>
                    </div>
                </div>
            </Grid>
        </Grid>
    )
}

export default withStyles(styles)(Header);