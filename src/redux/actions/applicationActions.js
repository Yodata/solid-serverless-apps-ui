// import store from '../store/initStore';
import { API } from "../../api/apiRequest";
import endpoint from "../../api/endpoints";
import { serviceUpdated } from "../slices/servicesSlice";
import { setTopicLabel } from "../slices/topicSlice";
import { modifyStoreWithLocalStore } from "../../utility";

/**
 *   Constants
 */

export const GET_APPS = "GET_APPS";
export const GET_LOCAL_APPS = "GET_LOCAL_APPS";
export const EDIT_APP = "EDIT_APP";
export const ADD_APP = "ADD_APP";
export const UPDATE_LOCAL_STORE = "UPDATE_LOCAL_STORE";

/**
 *   Actions
 */

const getApps = (payload) => {
  return { type: GET_APPS, application: payload };
};

const getLocalApps = (payload) => {
  return { type: GET_LOCAL_APPS, application: payload };
};

const addApp = (payload) => {
  return { type: ADD_APP, application: payload };
};

const editApp = (payload) => {
  return { type: EDIT_APP, application: payload };
};

const updateLocalStore = (payload) => {
  return { type: UPDATE_LOCAL_STORE, application: payload };
};

export const getAllApps = () => {
  return async (dispatch, getState) => {
    try {
      const response = await API.get(
        `https://forevercloudstore.${process.env.REACT_APP_HOSTNAME}/${endpoint.allApps}`
      );
      console.log("Fetched all apps:", response.data);
      dispatch(getApps(response.data));
      dispatch(setTopicLabel(response.data));
      const subs = getState().subs?.userSubs?.items;
      if (subs) {
        const updatedIDs = getState()
          .apps?.storeData?.application.map((value) => {
            for (let i = 0; i < subs.length; i++) {
              const identifier = subs[i].agent;
              if (
                value.id.toLowerCase() === identifier &&
                value.version !== subs[i].version
              ) {
                return identifier;
              }
            }
          })
          .filter(Boolean);
        dispatch(serviceUpdated(updatedIDs));
      }
      const parentOrg = getState().auth?.parentOrg;
      if (parentOrg) {
        const userResponse = await API.get(
          `https://${parentOrg}.${process.env.REACT_APP_HOSTNAME}/${endpoint.allApps}`
        );
        if (userResponse) {
          dispatch(getLocalApps(userResponse.data));
        }
      }
    } catch (err) {
      console.log(`error: ${err}`);
    }
  };
};

export const addNewApp = (value) => {
  return async (dispatch, getState) => {
    try {
      dispatch(addApp(value));
      await API.put(
        `https://forevercloudstore.${process.env.REACT_APP_HOSTNAME}/${endpoint.allApps}`,
        getState().apps.storeData
      );
    } catch (err) {
      throw err;
    }
  };
};

export const updateApp = (value) => {
  return async (dispatch, getState) => {
    try {
      dispatch(editApp(value));
      await API.put(
        `https://forevercloudstore.${process.env.REACT_APP_HOSTNAME}/${endpoint.allApps}`,
        getState().apps.storeData
      );
    } catch (err) {
      throw err;
    }
  };
};

export const updateLocalAppStore = (value) => {
  return async (dispatch, getState) => {
    try {
      dispatch(updateLocalStore(value));
      const parentOrg = getState().auth?.parentOrg;
      await API.put(
        `https://${parentOrg}.${process.env.REACT_APP_HOSTNAME}/${endpoint.allApps}`,
        getState().apps.localStoreData
      );
    } catch (err) {
      throw err;
    }
  };
};

export const updateStoreWithTopic = (value) => {
  return async (dispatch, getState) => {
    try {
      const updateData = {
        ...getState().apps.storeData,
        topic: getState().topic.topicLabels,
      };
      await API.put(
        `https://forevercloudstore.${process.env.REACT_APP_HOSTNAME}/${endpoint.allApps}`,
        updateData
      );
    } catch (err) {
      throw err;
    }
  };
};
