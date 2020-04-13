import { combineReducers } from 'redux';

import servicesReducer from '../slices/servicesSlice';
import groupReducer from '../slices/groupsSlice';
import applicationReducer from './applicationReducer';
import authenticationReducer from './authenticationReducer';

const rootReducer = combineReducers({
    services: servicesReducer,
    apps: applicationReducer ,
    groups: groupReducer,
    auth: authenticationReducer
})

export default rootReducer;