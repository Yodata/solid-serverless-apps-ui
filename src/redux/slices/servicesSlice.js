import { createSlice } from '@reduxjs/toolkit';

const serviceSlice = createSlice({
    name: 'service',
    initialState: {},
    reducers: {
        serviceEnabled: (state, action) => {
            return{
            ...state,
            enabled: !state.enabled,
            enabledID: action.payload
            }
        },
        serviceExpanded: (state, action) => ({
            ...state,
            expanded: !state.expanded,
            expandedID: action.payload
        })
    }
});

export const { serviceEnabled, serviceExpanded } = serviceSlice.actions;
export default serviceSlice.reducer;