import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    isLogged: false,
    user: null,
  },
  reducers: {
    login: (state, action) => {
      state.isLogged = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isLogged = false;
      state.user = null;
    },
  },
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;
