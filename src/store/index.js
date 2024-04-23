import { configureStore } from "@reduxjs/toolkit";
import headersDataSlice from "./slice/headersDataSlice";
import formLinesDataSlice from "./slice/formLinesDataSlice";

const store = configureStore({
  reducer: {headersDataSlice, formLinesDataSlice},
  devTools: import.meta.env.MODE !== "production",
});

export default store;

