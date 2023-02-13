import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    receptionOpen: false,
    confirmOpen: false,
    entryOpen: false,
    forbidOpen: false,
    roomId: null,
    isWait: false,
    isPlay: false,
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
    setForbidOpen: (state) => {
      state.forbidOpen = true;
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
    setForbidClose: (state) => {
      state.forbidOpen = false;
    },
    setRoomId: (state, action) => {
      state.roomId = action.payload;
    },
    setIsWait: (state, action) => {
      state.isWait = action.payload;
    },
    setIsPlay: (state, action) => {
      state.isPlay = action.payload;
    },
  },
});

export const {
  setReceptionOpen,
  setConfirmOpen,
  setEntryOpen,
  setForbidOpen,
  setReceptionClose,
  setConfirmClose,
  setEntryClose,
  setForbidClose,
  setRoomId,
  setIsWait,
  setIsPlay,
} = modalSlice.actions;
export default modalSlice.reducer;
