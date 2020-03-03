import { combineReducers } from 'redux';

import servicesReducer from '../slices/servicesSlice';
import groupReducer from '../slices/groupsSlice';
import applicationReducer from './applicationReducer';

const rootReducer = combineReducers({
    services: servicesReducer,
    apps: applicationReducer ,
    groups: groupReducer
})

export default rootReducer;