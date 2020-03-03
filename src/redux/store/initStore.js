import { configureStore } from '@reduxjs/toolkit';

import rootReducer from '../reducers';

const initStore = configureStore({
    reducer: rootReducer
});

export default initStore;