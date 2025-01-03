import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/redux/slices/authSlice";
import stockReducer from "@/redux/slices/stockSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    stock: stockReducer,
  },

  devTools: process.env.NODE_ENV !== "production",
});

export default store;
