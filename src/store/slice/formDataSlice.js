import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ENDPOINTS, customFetch } from "../../api";

const initialState = {
  data: [],
  status: null,
  error: null,
};

export const fetchFormData = createAsyncThunk(
  "header/fetchFormData",
  async function (_, { rejectWithValue }) {
    try {
      const response = await customFetch(ENDPOINTS.FORM_DATA);
      if (!response.ok) {
        throw new Error("Server Error!");
      }
      const data = await response.json();
      return data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const formDataSlice = createSlice({
  name: "lines",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchFormData.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchFormData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "resolved";
      })
      .addCase(fetchFormData.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "rejected";
      });
  },
});

// export const { createHeader, updateHeader, hideHeaders } =
// formDataSlice.actions;

export default formDataSlice.reducer;

export const selectFetchFormDataStatus = (state) => state.formDataSlice.status;

export const selectFormData = (state) => state.formDataSlice.data;
