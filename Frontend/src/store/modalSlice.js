import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    receptionOpen: false,
    confirmOpen: false,
    entryOpen: false,
    roomId: null,
    isWait: false,
  },
  reducers: {
    setReceptionOpen: (state) => {
      state.receptionOpen = true;
    },
    setConfirmOpen: (state) => {
      state.confirmOpen = true;
    },
    setEntryOpen: (state) => {
      state.entryOpen = true;
    },
    setReceptionClose: (state) => {
      state.receptionOpen = false;
    },
    setConfirmClose: (state) => {
      state.confirmOpen = false;
    },
    setEntryClose: (state) => {
      state.entryOpen = false;
    },
    setRoomId: (state, action) => {
      state.roomId = action.payload;
    },
    setIsWait: (state, action) => {
      state.isWait = action.payload;
    },
  },
});

export const {
  setReceptionOpen,
  setConfirmOpen,
  setEntryOpen,
  setReceptionClose,
  setConfirmClose,
  setEntryClose,
  setRoomId,
  setIsWait,
} = modalSlice.actions;
export default modalSlice.reducer;
