import { GET_USER, LOGOUT_USER } from '../actions/authenticationActions';

const defaultState = {
    isLoggedIn: false
}

const authenticationReducer = (state = defaultState, action) => {
    switch (action.type) {
        case GET_USER:
            const isUserLoggedIn = action.authentication.response && 
            action.authentication.response.status === 401 ? false : true;
            return {
                ...state,
                isLoggedIn: isUserLoggedIn
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