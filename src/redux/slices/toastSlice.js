import { createSlice } from '@reduxjs/toolkit';

const toastSlice = createSlice({
    name: 'toast',
    initialState: {
        success: false
    },
    reducers: {
        toastSuccess: (state, action) => {
            const newState = action.payload
            return {
                ...state,
                success: newState
            }
        }
    }
});

export const { toastSuccess } = toastSlice.actions;
export default toastSlice.reducer;