import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ENDPOINTS, customFetch } from "../../api";
import { setError, setPending } from "../../utils/setStateStatus";

const initialState = {
  data: [],
  status: null,
  error: null,
};

export const fetchLinesData = createAsyncThunk(
  "lines/fetchLinesData",
  async function (_, { rejectWithValue }) {
    try {
      const response = await customFetch(ENDPOINTS.LINES);
      if (!response.ok) {
        throw new Error("Server Error!");
      }
      const responseData = await response.json();
      return responseData;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const formLinesDataSlice = createSlice({
  name: "lines",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchLinesData.pending, setPending)
      .addCase(fetchLinesData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "resolved";
      })
      .addCase(fetchLinesData.rejected, setError);
  },
});

export default formLinesDataSlice.reducer;

export const selectFetchLinesDataStatus = (state) => state.lines.status;
export const selectLinesData = (state) => state.lines.data;
