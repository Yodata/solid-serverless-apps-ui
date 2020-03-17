import { GET_APPS, GET_CUSTOM } from '../actions/applicationActions';

const applicationReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_APPS:
            return {
                ...state,
                appList: action.application.application
            };
        case GET_CUSTOM:
            return {
                ...state,
                userCustomization: action.customization.userCustomization
            }
        default:
            return state;
    }
}

export default applicationReducer;