// import store from '../store/initStore';
import { API } from '../../api/apiRequest';
import endpoint from '../../api/endpoints';

/**
*   Constants
*/

export const GET_APPS = 'GET_APPS';
export const EDIT_APP = 'EDIT_APP';
export const ADD_APP = 'ADD_APP';


/**
 *   Actions
 */

const getApps = payload => {
    return ({ type: GET_APPS, application: payload });
};

const addApp = payload => {
    return ({ type: ADD_APP, application: payload });
};

const editApp = payload => {
    return ({ type: EDIT_APP, application: payload });
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

export const addNewApp = value => {
    return async (dispatch, getState) => {
        try {
            dispatch(addApp(value));
            console.log(getState());
            await API.put(endpoint.allApps, getState().apps.appList);
        } catch (err) {
            throw err
        }
    }
}

export const updateApp = value => {
    return async (dispatch, getState) => {
        try {
            dispatch(editApp(value));
            await API.put(endpoint.allApps, getState().apps.appList);
        } catch (err) {
            throw err;
        }
    }
}