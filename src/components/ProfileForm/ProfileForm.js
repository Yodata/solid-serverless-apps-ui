import React from 'react';
import axios from 'axios';
import {
    Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle,
    FormControl, FormControlLabel, FormGroup, FormLabel, TextField, makeStyles
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles(theme => ({
    title: { textAlign: 'center', padding: theme.spacing(3), '& h2': { fontSize: 32 } },
    content: { padding: theme.spacing(1, 4, 2) },
    options: { marginTop: theme.spacing(3) },
    actions: { justifyContent: 'center', padding: theme.spacing(2, 4, 3), gap: theme.spacing(1) },
    close: { backgroundColor: theme.palette.error.main, color: '#fff',
        '&:hover': { backgroundColor: theme.palette.error.dark } },
}));

const buckets = ['organization', 'office', 'agent'];

export default function ProfileForm({ buttonClassName }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [profile, setProfile] = React.useState('');
    const [postEndpoint, setPostEndpoint] = React.useState('');
    const [selectedBuckets, setSelectedBuckets] = React.useState(buckets);
    const [includeMainProfile, setIncludeMainProfile] = React.useState(true);
    const [dryRun, setDryRun] = React.useState(false);
    const [submitting, setSubmitting] = React.useState(false);
    const [feedback, setFeedback] = React.useState(null);
    const pending = React.useRef(false);
    const endpoint = process.env.REACT_APP_ADMIN_PROFILE_ENDPOINT ||
        'https://hweogixdt5.execute-api.us-west-2.amazonaws.com/crawler';
    const token = process.env.REACT_APP_CRAWLER_TOKEN;
    const close = () => { if (!pending.current) setOpen(false); };

    const handleSubmit = async event => {
        event.preventDefault();
        if (pending.current || !token || !profile.trim() || !postEndpoint.trim() ||
            (!selectedBuckets.length && !includeMainProfile)) return;
        pending.current = true;
        setSubmitting(true);
        setFeedback(null);
        try {
            await axios.post(endpoint, {
                POST_ENDPOINT: postEndpoint.trim(),
                MAIN_PROFILE: profile.trim(),
                BUCKETS_TO_POST: selectedBuckets,
                includeMainProfile,
                dryRun
            }, { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } });
            setFeedback({ severity: 'success', message: dryRun ?
                'Dry run request accepted.' : 'Profile push request accepted.' });
        } catch (error) {
            setFeedback({ severity: 'error', message: 'Unable to push profile. Please try again.' });
        } finally {
            pending.current = false;
            setSubmitting(false);
        }
    };

    return <>
        <Button variant="contained" disableElevation className={buttonClassName}
            onClick={() => { setFeedback(null); setOpen(true); }}>Push profile</Button>
        <Dialog open={open} onClose={close} fullWidth maxWidth="sm" aria-labelledby="push-profile-title">
            <DialogTitle id="push-profile-title" className={classes.title}>Push profile</DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent className={classes.content}>
                    <TextField id="main-profile" label="Main profile" type="url" required fullWidth
                        variant="outlined" size="small" margin="normal" value={profile}
                        placeholder="https://ca706-003.dev.bhhs.hsfaffiliates.com/profile/card#me"
                        disabled={submitting} onChange={event => { setProfile(event.target.value); setFeedback(null); }} />
                    <TextField id="post-endpoint" label="Post endpoint" type="url" required fullWidth
                        variant="outlined" size="small" margin="normal" value={postEndpoint}
                        placeholder="https://testing12.dev.bhhs.hsfaffiliates.com/inbox/"
                        disabled={submitting} onChange={event => { setPostEndpoint(event.target.value); setFeedback(null); }} />
                    <FormControl component="fieldset" className={classes.options} disabled={submitting}>
                        <FormLabel component="legend">Buckets to post</FormLabel>
                        <FormGroup row>{buckets.map(bucket => <FormControlLabel key={bucket}
                            label={bucket.charAt(0).toUpperCase() + bucket.slice(1)}
                            control={<Checkbox color="primary" checked={selectedBuckets.includes(bucket)}
                                onChange={event => {
                                    const checked = event.target.checked;
                                    setSelectedBuckets(current => buckets.filter(value => value === bucket ? checked : current.includes(value)));
                                    setFeedback(null);
                                }} />} />)}</FormGroup>
                    </FormControl>
                    <Box mt={1}>
                        <FormControlLabel label="Include main profile" control={<Checkbox color="primary"
                            checked={includeMainProfile} disabled={submitting}
                            onChange={event => { setIncludeMainProfile(event.target.checked); setFeedback(null); }} />} />
                        <FormControlLabel label="Dry run" control={<Checkbox color="primary"
                            checked={dryRun} disabled={submitting}
                            onChange={event => { setDryRun(event.target.checked); setFeedback(null); }} />} />
                    </Box>
                    {!token && <Alert severity="info">Profile push authorization is not configured.</Alert>}
                    {!selectedBuckets.length && !includeMainProfile &&
                        <Alert severity="info">Select a bucket or include the main profile.</Alert>}
                    {feedback && <Alert severity={feedback.severity}>{feedback.message}</Alert>}
                </DialogContent>
                <DialogActions className={classes.actions}>
                    <Button onClick={close} disabled={submitting} className={classes.close} disableElevation>Close</Button>
                    <Button type="submit" variant="contained" color="primary" disableElevation
                        disabled={submitting || !token || !profile.trim() || !postEndpoint.trim() ||
                            (!selectedBuckets.length && !includeMainProfile)}>
                        {submitting ? 'Submitting…' : 'Submit'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    </>;
}
