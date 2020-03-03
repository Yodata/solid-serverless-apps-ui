import { GET_APPS } from '../actions/applicationActions';

const applicationReducer = (state = {}, action) => {
    switch(action.type){
        case GET_APPS: 
            return{
                ...state,
                appList: action.application.application,
                userCustomization: action.application.userCustomization
            };
        default:
            return state;
    }
}

export default applicationReducer;