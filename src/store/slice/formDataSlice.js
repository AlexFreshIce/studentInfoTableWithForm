import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ENDPOINTS, customFetch } from "../../api";
import { setError, setPending } from "../../utils/setStateStatus";

const initialState = {
  data: [],
  status: null,
  error: null,
};

export const fetchFormData = createAsyncThunk(
  "formData/fetchFormData",
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
  name: "formData",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchFormData.pending, setPending)
      .addCase(fetchFormData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "resolved";
      })
      .addCase(fetchFormData.rejected, setError);
  },
});

export default formDataSlice.reducer;

export const selectFetchFormDataStatus = (state) => state.formData.status;
export const selectFormData = (state) => state.formData.data;
