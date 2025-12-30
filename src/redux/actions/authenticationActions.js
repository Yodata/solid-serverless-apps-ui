// import { API, APIBase, APIFormData } from '../../api/apiRequest';
import { API, APIBase } from "../../api/apiRequest";
import endpoint from "../../api/endpoints";
import { history } from "../../components/Authentication/history";
import { globalSubscription } from "../../redux/actions/subscriptionAction";
import { convertToFranchiseStore } from "../../utility";

/**
 *   Constants
 */

export const GET_USER = "GET_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const AUTHORISED_USER = "AUTHORISED_USER";
export const LIST_OF_ROLES = "LIST_OF_ROLES";
export const SET_PROFILE_ID = "SET_PROFILE_ID";
export const SET_ORGANISATION_ROLE = "SET_ORGANISATION_ROLE";
export const SET_NAME = "SET_NAME";
export const SET_AGENT_ACCESS = "SET_AGENT_ACCESS";

/**
 *   Actions
 */

const getUser = (payload) => {
  return { type: GET_USER, authentication: payload };
};

const logoutUser = () => {
  return { type: LOGOUT_USER };
};

const authorisedUser = (payload) => {
  return { type: AUTHORISED_USER, userList: payload };
};

const listOfRoles = (payload) => {
  return { type: LIST_OF_ROLES, profile: payload };
};

const setOrganisationRole = (payload) => {
  return { type: SET_ORGANISATION_ROLE, profile: payload };
};

export const setProfileId = (payload) => {
  return { type: SET_PROFILE_ID, profileId: payload };
};

export const setName = (payload) => {
  return { type: SET_NAME, name: payload };
};

export const setAgentAccess = (payload) => {
  return { type: SET_AGENT_ACCESS, access: payload };
};

export const currentUser = (props) => {
  return async (dispatch, getState) => {
    const search = window.location.search;
    console.log("search.", search);
    const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    try {
      let response;
      let attempts = 3;
      while (attempts > 0) {
        try {
          if (props) {
            response = await APIBase.get(`${endpoint.userAuth}?runAs=${props}`);
          } else {
            response = await APIBase.get(endpoint.userAuth);
          }
          break; // success → exit loop
        } catch (err) {
          attempts -= 1;
          if (attempts === 0) throw err;
          await wait(5000); // wait before retry
        }
      }
      // try {
      //     let response
      //     if (props) {
      //         response = await APIBase.get(`${endpoint.userAuth}?runAs=${props}`);
      //     } else {
      //         response = await APIBase.get(endpoint.userAuth);
      //     }
      dispatch(getUser(response));
      if (getState().auth.isLoggedIn) {
        dispatch(globalSubscription());
      }
    } catch (err) {
      dispatch(getUser(err));
      if (!getState().auth.isLoggedIn) {
        if (props) {
          console.log("search..", search, props);
          window.location.href = `https://${process.env.REACT_APP_HOSTNAME}/${endpoint.redirect}?runAs=${props}`;
        } else {
          console.log("search....", search);
          window.location.href = `https://${process.env.REACT_APP_HOSTNAME}/${endpoint.redirect}`;
        }
      }
    }
  };
};

export const authorisedUserList = () => {
  return async (dispatch, getState) => {
    try {
      const response = await API.get(
        `https://forevercloudstore.${process.env.REACT_APP_HOSTNAME}/${endpoint.credentials}`
      );
      dispatch(authorisedUser(response.data.adminUsers));
    } catch (err) {
      console.log(err);
    } finally {
      !getState().auth.userList.some(
        (ele) => ele.contactId === getState().auth.userId
      ) && dispatch(franchiseUserList());
    }
  };
};

export const franchiseUserList = () => {
  return async (dispatch, getState) => {
    try {
      const response = await API.get(getState().auth.userData.profile_id);
      dispatch(listOfRoles(response.data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const getParentOrgandRole = () => {
  let name;
  return async (dispatch, getState) => {
    try {
      const response = await API.get(getState().auth.userData.profile_id);
      // console.log(response.data)
      dispatch(setOrganisationRole(response.data));
      if (response.data.familyName || response.data.givenName) {
        name = `${response.data.familyName}, ${response.data.givenName}`;
      } else {
        name = getState()?.auth?.userData?.contact_id;
      }
      dispatch(setName(name));
    } catch (err) {
      name = getState()?.auth?.userData?.contact_id;
      dispatch(setName(name));
      console.log(err);
    }
  };
};

export const getOrganizationData = () => {
  return async (dispatch, getState) => {
    try {
      const orgID = convertToFranchiseStore(getState()?.auth?.orgID);
      const response = await API.get(
        `https://${orgID}.${process.env.REACT_APP_HOSTNAME}/${endpoint.profile}`
      );
      dispatch(
        setAgentAccess(
          response.data?.additionalProperty?.appExchangeAgentAccess
        )
      );
    } catch (err) {
      console.log(err);
    }
  };
};

export const signoutUser = () => {
  return async (dispatch, getState) => {
    try {
      const response = await APIBase.get(endpoint.userLogOut);
      dispatch(logoutUser());
      history.push("/login");
    } catch (err) {
      throw err;
    }
  };
};
