import { createSlice } from "@reduxjs/toolkit";

const languageSlice = createSlice({
  name: "language",
  initialState: {
    language: "np",
  },
  reducers: {
    changeLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

export const { changeLanguage } = languageSlice.actions;
export default languageSlice.reducer;
