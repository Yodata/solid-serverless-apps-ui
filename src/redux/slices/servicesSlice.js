import { createSlice } from "@reduxjs/toolkit";

const serviceSlice = createSlice({
  name: "service",
  initialState: {
    enabledID: [],
    updatedID: [],
  },
  reducers: {
    serviceEnabled: (state, action) => {
      const newEnabledIDs = action.payload
        ? action.payload.connect
          ? state.enabledID.includes(action.payload.id)
            ? [...state.enabledID]
            : [...state.enabledID, action.payload.id]
          : state.enabledID.filter((value) => value !== action.payload.id)
        : [];
      return {
        ...state,
        enabledID: newEnabledIDs,
      };
    },
    serviceUpdated: (state, action) => {
      return {
        ...state,
        updatedID: action.payload,
      };
    },
  },
});

export const { serviceEnabled, serviceUpdated } = serviceSlice.actions;
export default serviceSlice.reducer;
