import { GET_APPS, GET_CUSTOM, ADD_APP, EDIT_APP } from '../actions/applicationActions';

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
            };
        case ADD_APP:
            const newList = state.appList ? state.appList.slice() : [];
            newList.push(action.application);
            return {
                ...state,
                appList: [
                    ...newList
                ]
            };
        case EDIT_APP:
            const indexOfAppToEdit = state.appList.findIndex(x => Object.keys(x.identifier)[0] === Object.keys(action.application.identifier)[0]);
            const newApp = { ...action.application}
            const newAppList = state.appList.slice();
            newAppList.splice(indexOfAppToEdit, 1, newApp);
            return {
                ...state,
                appList: {
                    application: [
                    ...newAppList
                ]}
            };
        default:
            return state;
    }
}

export default applicationReducer;