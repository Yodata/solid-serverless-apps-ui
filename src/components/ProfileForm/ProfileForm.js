import React from 'react';
import { Box, Button, TextField, Typography, makeStyles } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { APIBase } from '../../api/apiRequest';

const useStyles = makeStyles(theme => ({
    form: {
        width: 540,
        maxWidth: '100%',
        minWidth: 0,
        padding: theme.spacing(1, 2),
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: theme.shape.borderRadius,
        boxSizing: 'border-box',
    },
    fields: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: theme.spacing(2),
        margin: theme.spacing(1, 0),
        '& .MuiTextField-root': { flex: '1 1 0', minWidth: 0 },
        '& .MuiInputBase-input': { fontSize: 13, padding: '9px 10px' },
        '& .MuiInputLabel-root': { fontSize: 13 },
        '& .MuiButton-root': { flexShrink: 0, textTransform: 'none' },
        [theme.breakpoints.down('xs')]: { flexWrap: 'wrap' },
    },
}));

export default function ProfileForm() {
    const classes = useStyles();
    const [profile, setProfile] = React.useState('');
    const [postProfile, setPostProfile] = React.useState('');
    const [submitting, setSubmitting] = React.useState(false);
    const [feedback, setFeedback] = React.useState(null);
    const pending = React.useRef(false);
    // Replace via environment configuration once the POST endpoint is available.
    const endpoint = process.env.REACT_APP_ADMIN_PROFILE_ENDPOINT;

    const handleSubmit = async event => {
        event.preventDefault();
        if (pending.current || !endpoint || !profile.trim() || !postProfile.trim()) return;

        pending.current = true;
        setSubmitting(true);
        setFeedback(null);
        try {
            await APIBase.post(endpoint, {
                // Placeholder field names; update to match the backend contract.
                profile: profile.trim(),
                postProfile: postProfile.trim()
            });
            setFeedback({ severity: 'success', message: 'Profiles submitted successfully.' });
        } catch (error) {
            setFeedback({ severity: 'error', message: 'Unable to submit profiles. Please try again.' });
        } finally {
            pending.current = false;
            setSubmitting(false);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} className={classes.form}
            aria-labelledby="profile-form-title">
            <Typography id="profile-form-title" variant="subtitle2">Submit profiles</Typography>
            <Box className={classes.fields}>
            <TextField id="admin-profile" label="Profile" value={profile}
                onChange={event => { setProfile(event.target.value); setFeedback(null); }}
                required fullWidth variant="outlined" size="small" disabled={submitting} />
            <TextField id="admin-post-profile" label="Post profile" value={postProfile}
                onChange={event => { setPostProfile(event.target.value); setFeedback(null); }}
                required fullWidth variant="outlined" size="small" disabled={submitting} />
                <Button type="submit" variant="contained" color="primary" size="small" disableElevation
                    disabled={submitting || !endpoint || !profile.trim() || !postProfile.trim()}>
                    {submitting ? 'Submitting…' : 'Submit'}
                </Button>
            </Box>
            {!endpoint && <Typography variant="caption" color="textSecondary">
                Profile submission is not configured yet.
            </Typography>}
            {feedback && <Alert severity={feedback.severity}>{feedback.message}</Alert>}
        </Box>
    );
}
