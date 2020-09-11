import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Toast(props) {
    const { open, type, message, handleToastClose } = props
    return (
        <>
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={open} autoHideDuration={3000} onClose={handleToastClose}>
                <Alert severity={type}>
                    {message}
                </Alert>
            </Snackbar>
        </>
    )
}

export default Toast