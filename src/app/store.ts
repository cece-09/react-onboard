import { configureStore } from "@reduxjs/toolkit";
import memoReducer from "../features/memo/memoSlice";
import optionReducer from "../features/option/optionSlice";

const store = configureStore({
  reducer: {
    memo: memoReducer,
    option: optionReducer,
  },
});

export default store;
