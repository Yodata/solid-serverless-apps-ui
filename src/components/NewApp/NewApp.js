import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import InsertPhotoRoundedIcon from '@material-ui/icons/InsertPhotoRounded';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import Popper from '@material-ui/core/Popper';
import CheckList from '../Checklist';

const styles = theme => ({

    editAppDetail: {
        marginTop: 8,
        marginbottom: 8
    },
    editImage: {
        marginLeft: 16,
        marginTop: 8,
        marginRight: 16
    },
    editAppTitle: {
        marginbottom: 8,
        marginTop: 8
    }
});

const permissions = [
    {
        "description": "create and update your leads",
        "id": "lead_write"
    },
    {
        "description": "view agent & office profiles",
        "id": "profile_read"
    },
    {
        "description": "see contact events",
        "id": "contact_read"
    },
    {
        "description": "modify your contact information",
        "id": "contact_write"
    },
    {
        "description": "see your leads",
        "id": "lead_read"
    },
]

function NewApp(props) {

    const { classes, isEditMode, tabIndex,
        application: { logo: { url = '' } = {}, name = '', description = '', id = '' },
        application = {}, editApplication, addNewApp } = props
    const [state, setState] = React.useState({
        isAddNew: false,
        newId: id,
        newTitle: name,
        newLogo: url,
        newDescription: description
    });

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handlePermission = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const open = Boolean(anchorEl);
    const popperId = open ? 'simple-popper' : undefined;


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

    const handleDone = () => {
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
            permissions: []
        };
        editedApplication.id = state.newId;
        editedApplication.name = state.newTitle;
        editedApplication.description = state.newDescription;
        editedApplication.logo.url = state.newLogo;
        addNewApp(editedApplication);
        setState({ ...state, isAddNew: false });
    }

    return (
        <Card className={classes.root}>
            {!state.isAddNew && !isEditMode ? (
                <CardActions>
                    <Button
                        size="large"
                        color="secondary"
                        onClick={handleNewApp}
                    >
                        Add New App
                        </Button>
                </CardActions>
            ) : (
                    <React.Fragment>
                        <TextField
                            className={classes.editImage}
                            id="edit-image"
                            label="Enter Image URL"
                            defaultValue={url}
                            variant="outlined"
                            color="secondary"
                            multiline
                            rows="3"
                            onChange={handleAppLogoChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <InsertPhotoRoundedIcon color="secondary" />
                                    </InputAdornment>
                                ),
                            }} />
                        <CardContent className={classes.cardContent}>
                            <TextField
                                className={classes.editID}
                                id="app-id"
                                defaultValue={id}
                                placeholder="App Id"
                                variant="outlined"
                                color="secondary"
                                fullWidth
                                onChange={handleAppIdChange}
                            />
                            <TextField
                                className={classes.editAppTitle}
                                id="app-title"
                                defaultValue={name}
                                placeholder="App Title"
                                variant="outlined"
                                color="secondary"
                                fullWidth
                                onChange={handleAppTitleChange}
                            />
                            <TextField
                                className={classes.editAppDetail}
                                id="edit-app-detail"
                                multiline
                                rows="2"
                                fullWidth
                                color="secondary"
                                placeholder="App Detail"
                                variant="outlined"
                                defaultValue={description}
                                onChange={handleAppDescriptionChange}
                            />
                        </CardContent>
                        <CardActions>
                            <Button className={classes.doneButton}
                                size="large"
                                color="secondary"
                                fullWidth
                                onClick={handlePermission}
                            >
                                Permissions
                            </Button>
                            <Popper id={popperId} open={open} anchorEl={anchorEl} placement='top-start'>
                                <CheckList permissions={permissions}/>
                            </Popper>
                            <Button className={classes.doneButton}
                                size="large"
                                color="secondary"
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