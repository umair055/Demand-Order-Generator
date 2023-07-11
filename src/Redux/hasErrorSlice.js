import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hasError: [],
};

export const hasErrorSlice = createSlice({
  name: "hasError",
  initialState,
  reducers: {
    AddTrueErrorsReducer: (state, action) => {
      state.hasError[action.payload] = true;
    },
    AddFalseErrorsReducer: (state, action) => {
      state.hasError[action.payload] = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { AddTrueErrorsReducer, AddFalseErrorsReducer } =
  hasErrorSlice.actions;

export default hasErrorSlice.reducer;
