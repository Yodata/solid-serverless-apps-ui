import { createSlice } from '@reduxjs/toolkit';

const serviceSlice = createSlice({
    name: 'service',
    initialState: {
        enabledID: [],
        expandedID: []
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
        serviceExpanded: (state, action) => {
            const newExpandedIDs = state.expandedID.includes(action.payload) ?
                state.expandedID.filter(value => value !== action.payload) :
                [...state.expandedID, action.payload];
            return {
                ...state,
                expandedID: newExpandedIDs
            }
        }
    }
});

export const { serviceEnabled, serviceExpanded } = serviceSlice.actions;
export default serviceSlice.reducer;