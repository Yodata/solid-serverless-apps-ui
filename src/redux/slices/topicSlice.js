import { createSlice } from '@reduxjs/toolkit';

const topicLabelSlice = createSlice({
    name: 'topicLabel',
    initialState: {
        
    },
    reducers: {
        setTopicLabel: (state, action) => {
            return{
                ...state,
                tabIndex: action.payload
            };
        }
    }
});

export const { setTopicLabel } = topicLabelSlice.actions;
export default topicLabelSlice.reducer;