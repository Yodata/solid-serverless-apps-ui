import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';

/**
 * @Component Header
 * @Description This component is the header of all the views
 */

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    card: {
        height: '100%',
    },
    cardMedia: {
        height: 'inherit',
        paddingTop: '56.25%',
        backgroundSize: '95%',
    },
    heroLogo: {
        justify: 'center'
    },
    heroBackGround: {
        backgroundColor: props => props.backgroundColor,
        color: 'white',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain'
    },
    heroContent: {
        margin: '0 auto',
        padding: `${theme.spacing(6)}px 0 ${theme.spacing(4)}px`
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    title: {
        fontWeight: '400',
        fontVariantCaps: 'all-petite-caps',
        width: '100%'
    }
});

function Header(props) {
    const { classes, title, content, backgroundImage } = props;
    return (
        <React.Fragment>
            <Grid container className={classes.root} spacing={0}>
                <Grid item xs={2}>
                    <Card className={classes.card}>
                        <CardMedia
                            className={classes.cardMedia}
                            image={backgroundImage ? backgroundImage : 'No Image'}
                        />
                    </Card>
                </Grid>
                <Grid item xs={10}>
                    <div className={classes.heroBackGround}>
                        <div className={classes.heroContent}>
                            <Typography className={classes.title}
                                component="h1"
                                variant="h2"
                                align="center"
                                color="inherit"
                                gutterBottom>
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
        </React.Fragment>
    )
}

export default withStyles(styles)(Header);