// import store from '../store/initStore';
import { API } from '../../api/apiRequest';
import endpoint from '../../api/endpoints';
import { serviceUpdated } from '../slices/servicesSlice'

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
    return async (dispatch, getState) => {
        try {
            const response = await API.get(`https://forevercloudstore.${process.env.REACT_APP_HOSTNAME}/${endpoint.allApps}`);
            dispatch(getApps(response.data));
            const subs = getState().subs?.userSubs?.items
            if (subs) {
                const updatedIDs = getState().apps?.storeData?.application.map(value => {
                    for (let i = 0; i < subs.length; i++) {
                        const identifier = subs[i].agent
                        if (value.id.toLowerCase() === identifier
                            && value.version !== subs[i].version) {
                            return identifier
                        }
                    }
                }).filter(Boolean)
                dispatch(serviceUpdated(updatedIDs))
            }
        } catch (err) {
            console.log(`error: ${err}`)    
        };
    };
};

export const addNewApp = value => {
    return async (dispatch, getState) => {
        try {
            dispatch(addApp(value));
            await API.put(`https://forevercloudstore.${process.env.REACT_APP_HOSTNAME}/${endpoint.allApps}`, getState().apps.storeData);
        } catch (err) {
            throw err
        }
    }
}

export const updateApp = value => {
    return async (dispatch, getState) => {
        try {
            dispatch(editApp(value));
            await API.put(`https://forevercloudstore.${process.env.REACT_APP_HOSTNAME}/${endpoint.allApps}`, getState().apps.storeData);
        } catch (err) {
            throw err;
        }
    }
}