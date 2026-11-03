import React from 'react';
import { render, fireEvent, screen, wait } from '@testing-library/react';
import axios from 'axios';
import ProfileForm from './ProfileForm';

jest.mock('axios', () => ({ post: jest.fn() }));
const oldToken = process.env.REACT_APP_CRAWLER_TOKEN;
const oldEndpoint = process.env.REACT_APP_ADMIN_PROFILE_ENDPOINT;
beforeEach(() => {
    process.env.REACT_APP_CRAWLER_TOKEN = 'test-token';
    delete process.env.REACT_APP_ADMIN_PROFILE_ENDPOINT;
    axios.post.mockReset();
});
afterAll(() => {
    for (const [key, value] of Object.entries({ REACT_APP_CRAWLER_TOKEN: oldToken, REACT_APP_ADMIN_PROFILE_ENDPOINT: oldEndpoint })) {
        if (value === undefined) delete process.env[key];
        else process.env[key] = value;
    }
});
function openAndFill() {
    render(<ProfileForm />);
    fireEvent.click(screen.getByText('Push profile'));
    fireEvent.change(screen.getByLabelText(/^Main profile/), { target: { value: 'https://example.com/profile/card#me' } });
    fireEvent.change(screen.getByLabelText(/^Post endpoint/), { target: { value: 'https://example.com/inbox/' } });
}
test('opens and closes modal without sending a request', () => {
    render(<ProfileForm />);
    expect(screen.queryByLabelText(/^Main profile/)).toBeNull();
    fireEvent.click(screen.getByText('Push profile'));
    expect(screen.getByLabelText(/^Main profile/)).toBeInTheDocument();
    fireEvent.click(screen.getByText('Close'));
    expect(axios.post).not.toHaveBeenCalled();
});
test('sends curl payload and bearer authorization; blocks duplicate submissions', async () => {
    let finish;
    axios.post.mockImplementation(() => new Promise(resolve => { finish = resolve; }));
    openAndFill();
    fireEvent.click(screen.getByText('Submit'));
    expect(axios.post).toHaveBeenCalledWith('https://hweogixdt5.execute-api.us-west-2.amazonaws.com/crawler', {
        POST_ENDPOINT: 'https://example.com/inbox/', MAIN_PROFILE: 'https://example.com/profile/card#me',
        BUCKETS_TO_POST: ['organization', 'office', 'team', 'agent'], includeMainProfile: true, dryRun: false
    }, { headers: { 'Content-Type': 'application/json', Authorization: 'Bearer test-token' } });
    fireEvent.submit(screen.getByText('Submitting…').closest('form'));
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(screen.getByText('Close').closest('button')).toBeDisabled();
    finish({});
    await wait(() => expect(screen.getByText('Profile push request accepted.')).toBeInTheDocument());
});
test('sends selected options and preserves values after failure for retry', async () => {
    axios.post.mockRejectedValue(new Error('Network failure'));
    openAndFill();
    fireEvent.click(screen.getByLabelText('Office'));
    fireEvent.click(screen.getByLabelText('Include main profile'));
    fireEvent.click(screen.getByLabelText('Dry run'));
    fireEvent.click(screen.getByText('Submit'));
    await wait(() => expect(screen.getByText(/Unable to push profile/)).toBeInTheDocument());
    expect(axios.post.mock.calls[0][1]).toMatchObject({ BUCKETS_TO_POST: ['organization', 'team', 'agent'], includeMainProfile: false, dryRun: true });
    expect(screen.getByLabelText(/^Main profile/)).toHaveValue('https://example.com/profile/card#me');
    expect(screen.getByText('Submit').closest('button')).not.toBeDisabled();
});
test('requires authorization configuration', () => {
    delete process.env.REACT_APP_CRAWLER_TOKEN;
    openAndFill();
    expect(screen.getByText('Submit').closest('button')).toBeDisabled();
    expect(axios.post).not.toHaveBeenCalled();
});
