import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",

  initialState: {
    user: {
      userId: null,
      firstname: "",
      lastname: "",
      avatar: "",
      userRole: false,
      token: null,
    },
    loading: false,
    error: false,
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    setUser: (state, { payload: { user } }) => {
      state.user = user;
    },
    loginSuccess: (state, { payload: { user } }) => {
      state.user = user;
      state.loading = false;
    },
    logoutSuccess: (state) => {
      state.loading = false;
      state.user = null;
    },
    registerSuccess: (state, { payload: { user } }) => {
      state.loading = false;
      state.user = user;
    },
    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {
  fetchStart,
  loginSuccess,
  logoutSuccess,
  registerSuccess,
  fetchFail,
  setUser,
} = authSlice.actions;
export default authSlice.reducer;
