import { createSlice } from '@reduxjs/toolkit';

const topicLabelSlice = createSlice({
    name: 'topicLabel',
    initialState: {
        topicLabels: {}
    },
    reducers: {
        setTopicLabel: (state, action) => {
            console.log({action})
            return{
                ...state,
                topicLabels: {...action.payload.topic}
            };
        }
    }
});

export const { setTopicLabel } = topicLabelSlice.actions;
export default topicLabelSlice.reducer;