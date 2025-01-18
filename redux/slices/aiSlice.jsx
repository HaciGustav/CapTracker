import { createSlice } from "@reduxjs/toolkit";

const aiSlice = createSlice({
  name: "ai",
  initialState: {
    loading: false,
    response: null,
    error: null,
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getSuccess: (state, action) => {
      state.loading = false;
      state.response = action.payload;
    },
  },
});

export const { fetchStart, fetchFail, getSuccess } = aiSlice.actions;

export default aiSlice.reducer;
