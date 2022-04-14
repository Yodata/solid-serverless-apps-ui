import { createSlice } from '@reduxjs/toolkit';

const roleNameSlice = createSlice({
    name: 'roleName',
    initialState: {
        roleName: 'admin'
    },
    reducers: {
        setRoleName: (state, action) => {
            return{
                ...state,
                roleName: action.payload
            };
        }
    }
});

export const { setRoleName } = roleNameSlice.actions;
export default roleNameSlice.reducer;