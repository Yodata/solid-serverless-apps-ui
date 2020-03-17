import API from '../../api/apiRequest';
import endpoint from '../../api/endpoints';

/**
*   Constants
*/

export const GET_APPS = 'GET_APPS';
export const GET_CUSTOM = 'GET_CUSTOM'

/**
 *   Actions
 */

const getApps = payload => {
    return ({ type: GET_APPS, application: payload });
};

const getUserCustomization = payload => {
    return ({ type: GET_CUSTOM, customization: payload });
};

export const getCustomization = () => {
    return async dispatch => {
        try {
            const response = await API.get(endpoint.userCustomization);
            dispatch(getUserCustomization(response.data));
        } catch (err) {
            throw err;
        };
    };
};

export const getAllApps = () => {
    return async dispatch => {
        try {
            const response = await API.get(endpoint.allApps);
            dispatch(getApps(response.data));
        } catch (err) {
            throw err;
        };
    };
};