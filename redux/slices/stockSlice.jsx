import { createSlice } from "@reduxjs/toolkit";

const stockSlice = createSlice({
  name: "stock",

  initialState: {
    transactions: {
      purchases: [],
      sales: [],
    },
    products: [],
    brands: [],
    firms: null,
    categories: null,
    loading: false,
    error: false,
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    getSuccess: (state, { payload: { data, name } }) => {
      state.loading = false;
      state[name] = data;
    },

    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { fetchStart, getSuccess, fetchFail } = stockSlice.actions;
export default stockSlice.reducer;
