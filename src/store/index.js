import { configureStore } from "@reduxjs/toolkit";
import formDataSlice from "./slice/formDataSlice";
import formLinesDataSlice from "./slice/formLinesDataSlice";
import headersDataSlice from "./slice/headersDataSlice";

const store = configureStore({
  reducer: {
    headers: headersDataSlice,
    lines: formLinesDataSlice,
    formData: formDataSlice,
  },
  devTools: import.meta.env.MODE !== "production",
});

export default store;
