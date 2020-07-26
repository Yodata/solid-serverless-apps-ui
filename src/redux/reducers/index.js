import { combineReducers } from 'redux';

import servicesReducer from '../slices/servicesSlice';
import groupReducer from '../slices/groupsSlice';
import applicationReducer from './applicationReducer';
import authenticationReducer from './authenticationReducer';
import subscriptionReducer from './subscriptionReducer'

const rootReducer = combineReducers({
    services: servicesReducer,
    apps: applicationReducer ,
    groups: groupReducer,
    auth: authenticationReducer,
    subs: subscriptionReducer
})

export default rootReducer;