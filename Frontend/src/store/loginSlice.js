import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "loginSlice",
  initialState: {
    isLogged: false,
    email: null,
    name: null,
    nickname: null,
  },
  reducers: {
    setUserLoginDetails: (state, action) => {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.nickname = action.payload.nickname;
    },
  },
});

export default loginSlice;
export const { setUserLoginDetails } = loginSlice.actions;
