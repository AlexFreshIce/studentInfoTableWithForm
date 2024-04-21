import { configureStore } from "@reduxjs/toolkit";
import headersDataSlice from "./slice/headersDataSlice";

const store = configureStore({
  reducer: {headersDataSlice},
  devTools: import.meta.env.MODE !== "production",
});

export default store;

