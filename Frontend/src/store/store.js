import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./loginSlice";

const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    login: loginSlice.reducer,
  },
});

export default store;
