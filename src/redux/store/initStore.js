import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import rootReducer from '../reducers';

const initStore = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware({
        serializableCheck: false
    })
});

export default initStore;