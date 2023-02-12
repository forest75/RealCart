import { createSlice } from "@reduxjs/toolkit";

const queueSlice = createSlice({
  name: "queue",
  initialState: {
    player1: null,
    player2: null,
    currentQueue: null,
    splitQueue: null,
    queueLength: 0,
  },
  reducers: {
    setQueue: (state, action) => {
      state.currentQueue = action.payload;
      state.splitQueue = action.payload.split(",");
      state.queueLength = state.splitQueue.length - 1;
    },
    setPlayer: (state, action) => {
      state.player1 = action.payload.player1;
      state.player2 = action.payload.player2;
    },
  },
});

export const { setQueue, setPlayer } = queueSlice.actions;
export default queueSlice.reducer;
