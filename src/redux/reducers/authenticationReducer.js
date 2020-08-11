import { GET_USER, LOGOUT_USER, AUTHORISED_USER, LIST_OF_ROLES, SET_PROFILE_ID } from '../actions/authenticationActions';
import endpoint from '../../api/endpoints'

const defaultState = {
    isLoggedIn: false,
    userId: '3014655',
    userData: {
        profile_id: `https://3014655.${process.env.REACT_APP_HOSTNAME}/${endpoint.profile}`,
        raw: {
            contact_id: '3014655'
        }
    },
    userList: [],
    franchiseList: []
}

const authenticationReducer = (state = defaultState, action) => {
    switch (action.type) {
        case GET_USER:
            const isUserLoggedIn = action.authentication.response &&
                action.authentication.response.status === 401 ? false : true;
            const currentUserId = isUserLoggedIn ? action.authentication.data?.raw?.contact_id[0] : state.userId
            const currentUserData = isUserLoggedIn ? action.authentication.data : state.userData
            return {
                ...state,
                isLoggedIn: isUserLoggedIn,
                userId: currentUserId,
                userData: {
                    profile_id: currentUserData?.profile_id,
                    contact_id: currentUserData?.raw.contact_id[0]
                }
            }
        case AUTHORISED_USER:
            const list = action.userList
            return {
                ...state,
                userList: list
            }
        case LIST_OF_ROLES:
            const profile = action.profile
            const listOfRoles = profile.memberOf.map(value => {
                if (value.roleName.toLowerCase() === 'marketing director'
                    || value.roleName.toLowerCase() === 'broker of record'
                    || value.roleName.toLowerCase() === 'owner'
                    || value.roleName.toLowerCase() === 'company technology admin') {
                    return { contactId: value.memberOf.id, roleName: value.roleName}
                }
            }).filter(Boolean)
            return {
                ...state,
                franchiseList: listOfRoles
            }
        case SET_PROFILE_ID:
            const profileId = action.profileId
            const newUserId = profileId.split("//").pop().split(".").shift()
            return{
                ...state,
                userData: {
                    profile_id: profileId,
                    contact_id: newUserId
                },
            }
        case LOGOUT_USER:
            return {
                ...state,
                isLoggedIn: false
            }
        default:
            return state;
    }
};

export default authenticationReducer;