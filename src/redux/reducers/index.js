import { combineReducers } from "redux";

import servicesReducer from "../slices/servicesSlice";
import groupReducer from "../slices/groupsSlice";
import applicationReducer from "./applicationReducer";
import authenticationReducer from "./authenticationReducer";
import subscriptionReducer from "./subscriptionReducer";
import toastReducer from "../slices/toastSlice";
import topicLabelReducer from "../slices/topicSlice";
import roleNameReducer from "../slices/roleSlice";

const rootReducer = combineReducers({
  services: servicesReducer,
  apps: applicationReducer,
  groups: groupReducer,
  auth: authenticationReducer,
  subs: subscriptionReducer,
  toast: toastReducer,
  topic: topicLabelReducer,
  role: roleNameReducer,
});

export default rootReducer;
