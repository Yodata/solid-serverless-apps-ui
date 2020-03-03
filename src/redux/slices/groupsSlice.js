import { createSlice } from '@reduxjs/toolkit';

const groupSlice = createSlice({
    name: 'group',
    initialState: {
        tabIndex: 'featured'
    },
    reducers: {
        setGroup: (state, action) => {
            return{
                ...state,
                tabIndex: action.payload
            };
        }
    }
});

export const { setGroup } = groupSlice.actions;
export default groupSlice.reducer;