import {
  GET_APPS,
  ADD_APP,
  EDIT_APP,
  GET_LOCAL_APPS,
  UPDATE_LOCAL_STORE
} from "../actions/applicationActions";

const applicationReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_APPS:
      return {
        ...state,
        storeData: action.application,
      };
    case GET_LOCAL_APPS:
      return {
        ...state,
        localStoreData: action.application,
      };
    case ADD_APP:
      const newList =
        state.storeData && state.storeData.application
          ? state.storeData.application.slice()
          : [];
      newList.push(action.application);
      return {
        ...state,
        storeData: {
          ...state.storeData,
          application: [...newList],
        },
      };
    case EDIT_APP:
      const indexOfAppToEdit = state.storeData.application.findIndex(
        (x) =>
          Object.keys(x.identifier)[0] ===
          Object.keys(action.application.identifier)[0]
      );
      const newApp = { ...action.application };
      const newstoreData = state.storeData.application.slice();
      newstoreData.splice(indexOfAppToEdit, 1, newApp);
      return {
        ...state,
        storeData: {
          ...state.storeData,
          application: [...newstoreData],
        },
      };
    case UPDATE_LOCAL_STORE:
      const index = state.localStoreData.application.findIndex(x => x.id === action.application.id)
      const newLocalApp = { ...action.application };
      const newLocalStoreData = state.localStoreData.application.slice();
      newLocalStoreData.splice(index, 1, newLocalApp);
      return {
        ...state,
        localStoreData: {
          ...state.localStoreData,
          application: [...newLocalStoreData]
        }
      }
    default:
      return state;
  }
};

export default applicationReducer;
