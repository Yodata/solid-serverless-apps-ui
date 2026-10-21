import React from 'react';
import { render, fireEvent, screen, wait } from '@testing-library/react';
import ProfileForm from './ProfileForm';
import { APIBase } from '../../api/apiRequest';

jest.mock('../../api/apiRequest', () => ({ APIBase: { post: jest.fn() } }));

const originalEndpoint = process.env.REACT_APP_ADMIN_PROFILE_ENDPOINT;
beforeEach(() => {
    process.env.REACT_APP_ADMIN_PROFILE_ENDPOINT = '/admin/profiles';
    APIBase.post.mockReset();
});
afterAll(() => {
    if (originalEndpoint === undefined) delete process.env.REACT_APP_ADMIN_PROFILE_ENDPOINT;
    else process.env.REACT_APP_ADMIN_PROFILE_ENDPOINT = originalEndpoint;
});

function fillForm() {
    fireEvent.change(screen.getByLabelText(/^Profile/), { target: { value: ' profile-value ' } });
    fireEvent.change(screen.getByLabelText(/^Post profile/), { target: { value: ' post-profile-value ' } });
}

test('submits both trimmed values and prevents duplicate submissions while pending', async () => {
    let resolveRequest;
    APIBase.post.mockImplementation(() => new Promise(resolve => { resolveRequest = resolve; }));
    render(<ProfileForm />);
    fillForm();
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
    expect(APIBase.post).toHaveBeenCalledWith('/admin/profiles', {
        profile: 'profile-value', postProfile: 'post-profile-value'
    });
    expect(screen.getByRole('button')).toBeDisabled();
    fireEvent.submit(screen.getByRole('button').closest('form'));
    expect(APIBase.post).toHaveBeenCalledTimes(1);
    resolveRequest({});
    await wait(() => expect(screen.getByText('Profiles submitted successfully.')).toBeInTheDocument());
});

test('preserves values and allows retry after failure', async () => {
    APIBase.post.mockRejectedValue(new Error('Network error'));
    render(<ProfileForm />);
    fillForm();
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
    await wait(() => expect(screen.getByText(/Unable to submit/)).toBeInTheDocument());
    expect(screen.getByLabelText(/^Profile/)).toHaveValue(' profile-value ');
    expect(screen.getByRole('button')).not.toBeDisabled();
});

test('requires configuration and nonblank inputs before sending a request', () => {
    delete process.env.REACT_APP_ADMIN_PROFILE_ENDPOINT;
    const { unmount } = render(<ProfileForm />);
    fillForm();
    expect(screen.getByRole('button')).toBeDisabled();
    unmount();
    process.env.REACT_APP_ADMIN_PROFILE_ENDPOINT = '/admin/profiles';
    render(<ProfileForm />);
    fireEvent.change(screen.getByLabelText(/^Profile/), { target: { value: '   ' } });
    expect(screen.getByRole('button')).toBeDisabled();
    expect(APIBase.post).not.toHaveBeenCalled();
});
