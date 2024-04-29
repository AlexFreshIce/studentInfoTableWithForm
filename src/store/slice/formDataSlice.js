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
      const responseData = await response.json();
      return responseData;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const postFormData = createAsyncThunk(
  "formData/postFormData",
  async function (data, { rejectWithValue, dispatch }) {
    try {
      const response = await customFetch(ENDPOINTS.FORM_DATA, "POST", data);
      if (!response.ok) {
        throw new Error("Server Error!");
      }
      const responseData = await response.json();
      dispatch(addFormData(responseData));
      return responseData;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const formDataSlice = createSlice({
  name: "formData",
  initialState,
  reducers: {
    addFormData: (state, action) => {
      state.data.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFormData.pending, setPending)
      .addCase(postFormData.pending, setPending)
      .addCase(fetchFormData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "resolved";
      })
      .addCase(postFormData.fulfilled, (state) => {
        state.status = "resolved";
      })
      .addCase(fetchFormData.rejected, setError)
      .addCase(postFormData.rejected, setError);
  },
});
const { addFormData } = formDataSlice.actions;
export default formDataSlice.reducer;

export const selectFetchFormDataStatus = (state) => state.formData.status;
export const selectFormData = (state) => state.formData.data;
