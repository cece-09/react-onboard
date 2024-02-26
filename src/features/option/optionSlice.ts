import { createSlice } from "@reduxjs/toolkit";

export const optionSlice = createSlice({
  name: "option",
  initialState: {
    color: 0,
    sticker: null,
    align: 0,
  },
  reducers: {
    setColor(state, action) {
      state.color = action.payload;
    },
    setSticker(state, action) {
      if (state.sticker === action.payload) {
        state.sticker = null;
      } else {
        state.sticker = action.payload;
      }
    },
    setAlign(state, action) {
      state.align = action.payload;
    },
  },
});

export const { setColor, setSticker, setAlign } = optionSlice.actions;
export default optionSlice.reducer;
