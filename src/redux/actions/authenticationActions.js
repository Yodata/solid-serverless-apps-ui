import { APIAuth } from '../../api/apiRequest';
import endpoint from '../../api/endpoints';
import { history } from '../../components/Authentication/history';

/**
*   Constants
*/

export const GET_USER = 'GET_USER';
export const LOGOUT_USER = 'LOGOUT_USER';


/**
 *   Actions
 */

const getUser = payload => {
    return ({ type: GET_USER, authentication: payload });
};

const logoutUser = () => {
    return ({ type: LOGOUT_USER });
};

export const currentUser = () => {
    return async (dispatch, getState) => {
        try {
            const response = await APIAuth.get(endpoint.userAuth);
            dispatch(getUser(response));
            if (getState().auth.isLoggedIn) {
                history.push('/');
            }
            else {
                history.push('/login');
            }
        } catch (err) {
            dispatch(getUser(err));
        };
    };
};

export const signoutUser = () => {
    return async (dispatch, getState) => {
        try {
            const response = await APIAuth.get(endpoint.userLogOut);
            dispatch(logoutUser());
            history.push('/login');
        } catch (err) {
            throw err;
        }
    }
}