import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

const styles = theme => ({
    root: {
        position: 'relative',
        minWidth: 300,
        maxWidth: 300,
        maxHeight: 350
    },
    padding: {
        paddingTop: 8,
        fontSize: 10
    },
    resize: {
        fontSize: 16
    },
    adminButtons: {
        paddingRight: 17.5,
        paddingLeft: 17.5,
        backgroundColor: theme.palette.adminButtons.main,
        textTransform: 'none'
    },
    cardContent: {
        padding: 8
    }
});

function NewApp(props) {

    const { classes, isEditMode, tabIndex,
        application: { logo: { url = '' } = {}, name = '', description = '', id = '' },
        application = {}, editApplication, addNewApp, handleCancel } = props
    const [state, setState] = React.useState({
        isAddNew: false,
        newId: id,
        newTitle: name,
        newLogo: url,
        newDescription: description
    });

    React.useEffect(() => {
        setState({ ...state, isAddNew: false });
    }, [tabIndex]);

    const handleNewApp = () => {
        setState({ ...state, isAddNew: true });
    };

    const handleAppIdChange = event => {
        const id = event.currentTarget.value;
        setState({ ...state, newId: id });
    };

    const handleAppLogoChange = event => {
        const logo = event.currentTarget.value;
        setState({ ...state, newLogo: logo })
    };

    const handleAppTitleChange = event => {
        const title = event.currentTarget.value;
        setState({ ...state, newTitle: title })
    };

    const handleAppDescriptionChange = event => {
        const description = event.currentTarget.value;
        setState({ ...state, newDescription: description })
    };

    const handleDone = value => {
        const editedApplication = JSON.parse(JSON.stringify(application));
        editedApplication.id = state.newId;
        editedApplication.name = state.newTitle;
        editedApplication.description = state.newDescription;
        editedApplication.logo.url = state.newLogo;
        editApplication(editedApplication);
    }

    const handleAddNew = () => {
        const editedApplication = {
            identifier: {

            },
            id: '',
            name: '',
            description: '',
            logo: {
                url: ''
            },
            group: [],
            permissions: [],
            isVisible: true
        };
        editedApplication.id = state.newId;
        editedApplication.name = state.newTitle;
        editedApplication.description = state.newDescription;
        editedApplication.logo.url = state.newLogo;
        addNewApp(editedApplication);
        setState({ ...state, isAddNew: false });
    }

    const cancelButton = () => {
        handleCancel()
    }

    return (
        <Card className={classes.root}>
            {!state.isAddNew && !isEditMode ? (
                <CardActions>
                    {/* <Button
                        size="large"
                        color="secondary"
                        onClick={handleNewApp}
                    >
                        Add New App
                        </Button> */}
                </CardActions>
            ) : (
                    <React.Fragment>
                        <CardContent className={classes.cardContent}>
                            <Typography style={{ fontSize: '10px' }}>Logo Image URL</Typography>
                            <TextField
                                id="edit-image"
                                defaultValue={url}
                                variant="outlined"
                                color="secondary"
                                rows="3"
                                fullWidth
                                size='small'
                                InputProps={{
                                    classes: {
                                        input: classes.resize,
                                    },
                                }}
                                onChange={handleAppLogoChange}
                            />
                            <Typography className={classes.padding}>POD Profile</Typography>
                            <TextField
                                id="profie-id"
                                defaultValue={id}
                                placeholder="https://yodata.io/profile/card#me"
                                variant="outlined"
                                color="secondary"
                                fullWidth
                                size='small'
                                InputProps={{
                                    classes: {
                                        input: classes.resize,
                                    },
                                }}
                                onChange={handleAppIdChange}
                            />
                            <Typography className={classes.padding}>Display Name</Typography>
                            <TextField
                                id="app-title"
                                defaultValue={name}
                                placeholder="App Title"
                                variant="outlined"
                                color="secondary"
                                fullWidth
                                size='small'
                                InputProps={{
                                    classes: {
                                        input: classes.resize,
                                    },
                                }}
                                onChange={handleAppTitleChange}
                            />
                            <Typography className={classes.padding}>Company Description</Typography>
                            <TextField
                                id="edit-app-detail"
                                multiline
                                rows="3"
                                fullWidth
                                color="secondary"
                                placeholder="App Detail"
                                variant="outlined"
                                defaultValue={description}
                                size='small'
                                InputProps={{
                                    classes: {
                                        input: classes.resize,
                                    },
                                }}
                                onChange={handleAppDescriptionChange}
                            />
                        </CardContent>
                        <CardActions>
                            <Button
                                className={classes.adminButtons}
                                variant="outlined"
                                onClick={cancelButton}
                                fullWidth
                            >
                                Cancel
                            </Button>
                            <Button
                                className={classes.adminButtons}
                                variant="outlined"
                                fullWidth
                                onClick={state.isAddNew ? handleAddNew : handleDone}
                            >
                                Done
                            </Button>
                        </CardActions>
                    </React.Fragment>
                )
            }
        </Card>
    );
}

export default withStyles(styles)(NewApp);