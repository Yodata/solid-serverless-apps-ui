import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function LoginDialog(props) {

    const handleLogin = () => {
        //window.location.href = "https://dev.env.yodata.io/reflex/auth/saml/login";
    };

    return (
        <React.Fragment>
            <Dialog
                open={true}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Use Solid Serverless Apps service?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Click on the login button to autheticate the user.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleLogin} color="secondary">
                        Login
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default LoginDialog;