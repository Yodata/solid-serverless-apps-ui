import { GET_APPS, ADD_APP, EDIT_APP } from '../actions/applicationActions';

const applicationReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_APPS:
            return {
                ...state,
                storeData: action.application
            };
        case ADD_APP:
            const newList = state.storeData && 
            state.storeData.application ? state.storeData.application.slice() : [];
            newList.push(action.application);
            return {
                ...state,
                storeData: {
                    ...state.storeData,
                    application: [
                    ...newList
                ]}
            };
        case EDIT_APP:
            const indexOfAppToEdit = state.storeData.application.findIndex(x => Object.keys(x.identifier)[0] === Object.keys(action.application.identifier)[0]);
            const newApp = { ...action.application}
            const newstoreData = state.storeData.application.slice();
            newstoreData.splice(indexOfAppToEdit, 1, newApp);
            return {
                ...state,
                storeData: {
                    ...state.storeData,
                    application: [
                    ...newstoreData
                ]}
            };
        default:
            return state;
    }
}

export default applicationReducer;