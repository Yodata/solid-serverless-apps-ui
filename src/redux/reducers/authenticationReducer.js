import {
  GET_USER,
  LOGOUT_USER,
  AUTHORISED_USER,
  LIST_OF_ROLES,
  SET_PROFILE_ID,
  SET_ORGANISATION_ROLE
} from "../actions/authenticationActions";
import endpoint from "../../api/endpoints";
import {convertToFranchiseStore} from '../../utility'

const defaultState = {
  isLoggedIn: false,
  userId: "3014655",
  userData: {
    profile_id: `https://3014655.${process.env.REACT_APP_HOSTNAME}/${endpoint.profile}`,
    contact_id: "3014655",
    userDomain: "",
  },
  userList: [],
  franchiseList: [],
  isFranchiseUser: false,
  parentOrg: ''
};

const authenticationReducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_USER:
      const isUserLoggedIn =
        action.authentication.response &&
        action.authentication.response.status === 401
          ? false
          : true;
      const currentUserId = isUserLoggedIn
        ? action.authentication.data?.raw?.contact_id[0]
        : state.userId;
      const currentUserData = isUserLoggedIn
        ? action.authentication.data
        : state.userData;
      const currentUserDomain = isUserLoggedIn
        ? currentUserData?.profile_id
            .split("/")[2]
            .replace(currentUserData?.raw.contact_id[0], "")
        : process.env.REACT_APP_HOSTNAME;
      return {
        ...state,
        isLoggedIn: isUserLoggedIn,
        userId: currentUserId,
        userData: {
          profile_id: currentUserData?.profile_id,
          contact_id: currentUserData?.raw?.contact_id[0],
          userDomain: currentUserDomain,
        },
      };
    case AUTHORISED_USER:
      const list = action.userList;
      return {
        ...state,
        userList: list,
      };
    case LIST_OF_ROLES:
      const profile = action.profile;
      const listOfRoles = profile.memberOf
        ?.map((value) => {
          if (
            value.roleName.toLowerCase() === "marketing director" ||
            value.roleName.toLowerCase() === "broker of record" ||
            value.roleName.toLowerCase() === "owner" ||
            value.roleName.toLowerCase() === "app exchange admin"
          ) {
            return {
              profileId: value.memberOf.id,
              contactId: value.memberOf.id.split("//").pop().split(".").shift(),
              roleName: value.roleName,
            };
          }
        })
        .filter(Boolean);
      const removeDuplicates = Array.from(
        new Set(listOfRoles.map((a) => a.contactId))
      ).map((id) => {
        return listOfRoles.find((a) => a.contactId === id);
      });
      return {
        ...state,
        franchiseList: removeDuplicates,
      };
    case SET_PROFILE_ID:
      const profileId = action.profileId;
      const newUserId = profileId.split("//").pop().split(".").shift();
      return {
        ...state,
        userData: {
          ...state.userData,
          profile_id: profileId,
          contact_id: newUserId,
        },
      };
    case SET_ORGANISATION_ROLE:
      const userProfile = action.profile;
      console.log({userProfile})
      const role = userProfile.type;

      const parentOrg = role === "RealEstateOrganization" ? convertToFranchiseStore(userProfile.id) : convertToFranchiseStore(userProfile.parentOrganization[0])
      return {
        ...state,
        isFranchiseUser: role === "RealEstateOrganization" ? true : false,
        parentOrg
      };
    case LOGOUT_USER:
      return {
        ...state,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

export default authenticationReducer;
