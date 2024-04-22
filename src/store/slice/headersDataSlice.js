import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ENDPOINTS, customFetch } from "../../api";

const initialState = {
  data: [],
  status: null,
  error: null,
  hiddenHeaders: [],
};

export const fetchHeadersData = createAsyncThunk(
  "header/fetchHeadersData",
  async function (_, { rejectWithValue }) {
    try {
      const response = await customFetch(ENDPOINTS.HEADER);
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

export const headersDataSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    createHeader: (state, action) => {
      console.log(state.data);
      const lastId = state.data.lengths
        ? state.data.reduce((acc, el) => {
            return el.f_pers_young_spec_id > acc
              ? el.f_pers_young_spec_id
              : acc.f_pers_young_spec_id;
          }, 0)
        : 0;
      const newHeader = { f_pers_young_spec_id: lastId + 1, ...action.payload };
      state.data.push(newHeader);
    },
    updateHeader: (state, action) => {
      const headerIndex = state.data.findLastIndex(
        (header) =>
          header.f_pers_young_spec_id === action.payload.f_pers_young_spec_id
      );
      const newHeader = { ...state.data[headerIndex], ...action.payload };
      state.data[headerIndex] = newHeader;
    },
    hideHeaders: (state, action) => {
      if (state.hiddenHeaders.indexOf(action.payload) !== -1) {
        state.hiddenHeaders = state.hiddenHeaders.filter(
          (el) => el !== action.payload
        );
      } else {
        state.hiddenHeaders = [...state.hiddenHeaders, action.payload];
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchHeadersData.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchHeadersData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "resolved";
      })
      .addCase(fetchHeadersData.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "rejected";
      });
  },
});

export const { createHeader, updateHeader, hideHeaders } =
  headersDataSlice.actions;

export default headersDataSlice.reducer;

export const selectFetchHeadersDataStatus = (state) =>
  state.headersDataSlice.status;
export const selectHeadersData = (state) => state.headersDataSlice.data;
export const selectHiddenHeaders = (state) =>
  state.headersDataSlice.hiddenHeaders;
