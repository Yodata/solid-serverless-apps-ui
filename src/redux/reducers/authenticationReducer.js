import { GET_USER, LOGOUT_USER } from '../actions/authenticationActions';

const defaultState = {
    isLoggedIn: false,
    userId: null,
    userData: {}
}

const authenticationReducer = (state = defaultState, action) => {
    switch (action.type) {
        case GET_USER:
            const isUserLoggedIn = action.authentication.response && 
            action.authentication.response.status === 401 ? false : true;
            const currentUserId = isUserLoggedIn ? action.authentication.data?.raw?.contact_id[0] : null
            const currentUserData = isUserLoggedIn ? action.authentication.data : {}
            return {
                ...state,
                isLoggedIn: isUserLoggedIn,
                userId: currentUserId,
                userData: currentUserData
            }
        case LOGOUT_USER:
            return{
                ...state,
                isLoggedIn: false
            }
        default:
            return state;
    }
};

export default authenticationReducer;