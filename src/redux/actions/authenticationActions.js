// import { API, APIBase, APIFormData } from '../../api/apiRequest';
import { API, APIBase } from '../../api/apiRequest';
import endpoint from '../../api/endpoints';
import { history } from '../../components/Authentication/history';
import { globalSubscription } from '../../redux/actions/subscriptionAction'

/**
*   Constants
*/

export const GET_USER = 'GET_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const AUTHORISED_USER = 'AUTHORISED_USER'
export const LIST_OF_ROLES = 'LIST_OF_ROLES'
export const SET_PROFILE_ID = 'SET_PROFILE_ID'
export const SET_ORGANISATION_ROLE = 'SET_ORGANISATION_ROLE'


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
    return ({ type: AUTHORISED_USER, userList: payload })
}

const listOfRoles = payload => {
    return ({ type: LIST_OF_ROLES, profile: payload })
}

const setOrganisationRole = payload => {
    return ({ type: SET_ORGANISATION_ROLE, profile: payload })
}

export const setProfileId = payload => {
    return ({ type: SET_PROFILE_ID, profileId: payload })
}

export const currentUser = () => {
    return async (dispatch, getState) => {
        try {
            const response = await APIBase.get(endpoint.userAuth);
            dispatch(getUser(response));
            if (getState().auth.isLoggedIn) {
                dispatch(globalSubscription())
            }
        } catch (err) {
            dispatch(getUser(err));
            if (!getState().auth.isLoggedIn) {
                window.location.href = `https://${process.env.REACT_APP_HOSTNAME}/${endpoint.redirect}`;
            }
        }
    }
}

export const authorisedUserList = () => {
    return async (dispatch, getState) => {
        try {
            const response = await API.get(`https://forevercloudstore.${process.env.REACT_APP_HOSTNAME}/${endpoint.credentials}`)
            dispatch(authorisedUser(response.data.adminUsers))
            dispatch(getParentOrgandRole())
        } catch (err) {
            console.log(err)
        } finally {
            !getState().auth.userList.some(ele => ele.contactId === getState().auth.userId) &&
            dispatch(franchiseUserList())
        }
    }
}

export const franchiseUserList = () => {
    return async (dispatch, getState) => {
        try {
            const response = await API.get(getState().auth.userData.profile_id)
            dispatch(listOfRoles(response.data))
        } catch (err) {
            console.log(err)
        }
    }
}

export const getParentOrgandRole = () => {
    return async (dispatch, getState) => {
        try {
            const response = await API.get(getState().auth.userData.profile_id)
            dispatch(setOrganisationRole(response.data))
        } catch (err) {
            console.log(err)
        }
    }
}

export const signoutUser = () => {
    return async (dispatch, getState) => {
        try {
            const response = await APIBase.get(endpoint.userLogOut);
            dispatch(logoutUser());
            history.push('/login');
        } catch (err) {
            throw err;
        }
    }
}