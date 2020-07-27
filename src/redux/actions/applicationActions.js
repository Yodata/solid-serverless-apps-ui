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
            const response = await API.get(`https://sandbox.dev.env.yodata.io/${endpoint.allApps}`);
            dispatch(getApps(response.data));
            const subs = getState().subs?.userSubs?.items
            if (subs) {
                const updatedIDs = getState().apps?.storeData?.application.map(value => {
                    for (let i = 0; i < subs.length; i++) {
                        const identifier = `${subs[i].agent.split("/")[2].split(".")[0]}_id`
                        if (Object.keys(value.identifier)[0] === identifier
                            && value.version !== subs[i].version) {
                            return identifier
                        }
                    }
                }).filter(Boolean)
                console.log(updatedIDs)
                dispatch(serviceUpdated(updatedIDs))
            }
        } catch (err) {
            throw err;
        };
    };
};

export const addNewApp = value => {
    return async (dispatch, getState) => {
        try {
            dispatch(addApp(value));
            await API.put(`https://sandbox.dev.env.yodata.io/${endpoint.allApps}`, getState().apps.storeData);
        } catch (err) {
            throw err
        }
    }
}

export const updateApp = value => {
    return async (dispatch, getState) => {
        try {
            dispatch(editApp(value));
            await API.put(`https://sandbox.dev.env.yodata.io/${endpoint.allApps}`, getState().apps.storeData);
        } catch (err) {
            throw err;
        }
    }
}