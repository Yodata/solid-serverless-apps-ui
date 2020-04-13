import { GET_APPS, ADD_APP, EDIT_APP } from '../actions/applicationActions';

const applicationReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_APPS:
            return {
                ...state,
                appList: action.application
            };
        case ADD_APP:
            const newList = state.appList && 
            state.appList.application ? state.appList.application.slice() : [];
            newList.push(action.application);
            return {
                ...state,
                appList: {
                    ...state.appList,
                    application: [
                    ...newList
                ]}
            };
        case EDIT_APP:
            const indexOfAppToEdit = state.appList.application.findIndex(x => Object.keys(x.identifier)[0] === Object.keys(action.application.identifier)[0]);
            const newApp = { ...action.application}
            const newAppList = state.appList.application.slice();
            newAppList.splice(indexOfAppToEdit, 1, newApp);
            return {
                ...state,
                appList: {
                    ...state.appList,
                    application: [
                    ...newAppList
                ]}
            };
        default:
            return state;
    }
}

export default applicationReducer;