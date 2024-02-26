import { createSlice } from "@reduxjs/toolkit";
import { Memo } from "./memo.type";

// get data from local storage
const initialState = JSON.parse(localStorage.getItem("memo") || "[]") as Memo[];

const memoSlice = createSlice({
  name: "memo",
  initialState,
  reducers: {
    addMemo(state, action) {
      const memo: Memo = action.payload;
      state.push(memo);
    },
  },
});

export const { addMemo } = memoSlice.actions;
export default memoSlice.reducer;
