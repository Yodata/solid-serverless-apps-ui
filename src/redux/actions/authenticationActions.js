import { APIAuth, API } from '../../api/apiRequest';
import endpoint from '../../api/endpoints';
import { history } from '../../components/Authentication/history';
import { globalSubscription, userSubscriptions } from '../../redux/actions/subscriptionAction'

/**
*   Constants
*/

export const GET_USER = 'GET_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const AUTHORISED_USER = 'AUTHORISED_USER'


/**
 *   Actions
 */

const getUser = payload => {
    return ({ type: GET_USER, authentication: payload });
};

const logoutUser = () => {
    return ({ type: LOGOUT_USER });
};

const authorisedUser = payload => {
    return ({ type: AUTHORISED_USER, userList: payload})
}

export const currentUser = () => {
    return async (dispatch, getState) => {
        try {
            const response = await APIAuth.get(endpoint.userAuth);
            dispatch(getUser(response));
            if (getState().auth.isLoggedIn) {
                dispatch(globalSubscription())
                dispatch(userSubscriptions(getState().auth.userId))
            }
        } catch (err) {
            dispatch(getUser(err));
            if (!getState().auth.isLoggedIn) {
                window.location.href = "https://dev.env.yodata.io/reflex/auth/saml/login";
            }
        };
    };
};

export const authorisedUserList = () => {
    return async dispatch => {
        try {
            const response = await API.get(`https://auth.dev.env.yodata.io/${endpoint.credentials}`)
            dispatch(authorisedUser(response.data.adminUsers))
        } catch (err) {
            console.log(err)
        }
    }
}

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