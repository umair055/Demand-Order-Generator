import { configureStore } from "@reduxjs/toolkit";
import hasErrorReducer from "./hasErrorSlice";

export const store = configureStore({
  reducer: { hasError: hasErrorReducer },
});
