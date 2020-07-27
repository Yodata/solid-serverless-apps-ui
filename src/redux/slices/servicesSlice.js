import { createSlice } from '@reduxjs/toolkit';

const serviceSlice = createSlice({
    name: 'service',
    initialState: {
        enabledID: [],
        updatedID: []
    },
    reducers: {
        serviceEnabled: (state, action) => {
            const newEnabledIDs = state.enabledID.includes(action.payload) ?
                state.enabledID.filter(value => value !== action.payload) :
                [...state.enabledID, action.payload];
            return {
                ...state,
                enabledID: newEnabledIDs
            }
        },
        serviceUpdated: (state, action) => {
            return {
                ...state,
                updatedID: action.payload
            }
        }
    }
});

export const { serviceEnabled, serviceUpdated } = serviceSlice.actions;
export default serviceSlice.reducer;