import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { ENDPOINTS, customFetch } from "../../api";
import { setError, setPending } from "../../utils/setStateStatus";

const initialState = {
  data: [],
  status: null,
  error: null,
  hiddenHeaders: [],
};

export const fetchHeadersData = createAsyncThunk(
  "headers/fetchHeadersData",
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

export const patchHeaderData = createAsyncThunk(
  "headers/patchHeaderData",
  async function (data, { rejectWithValue, dispatch, getState }) {
    try {
      const url = ENDPOINTS.HEADER + `${data.f_pers_young_spec_id}/`;

      const response = await customFetch(url, "PATCH", data);
      if (!response.ok) {
        throw new Error("Server Error!");
      }
      const responseData = await response.json();
      const isEmptyHeaders = !getState().headers.data.length;

      if (isEmptyHeaders) {
        console.log(isEmptyHeaders);
        dispatch(fetchHeadersData());
      } else {
        dispatch(updateHeader(responseData));
      }
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const headersDataSlice = createSlice({
  name: "headers",
  initialState,
  reducers: {
    createHeader: (state, action) => {
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
      state.data[headerIndex] = action.payload;
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
      .addCase(fetchHeadersData.pending, setPending)
      .addCase(patchHeaderData.pending, setPending)
      .addCase(fetchHeadersData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "resolved";
      })
      .addCase(patchHeaderData.fulfilled, (state) => {
        state.status = "resolved";
      })
      .addCase(fetchHeadersData.rejected, setError)
      .addCase(patchHeaderData.rejected, setError);
  },
});

export const { createHeader, updateHeader, hideHeaders } =
  headersDataSlice.actions;

export default headersDataSlice.reducer;

export const selectFetchHeadersDataStatus = (state) => state.headers.status;
export const selectHeadersData = (state) => state.headers.data;
export const selectHiddenHeaders = (state) => state.headers.hiddenHeaders;

export const getHeaderById = createSelector(
  [selectHeadersData, (_, id) => id],
  (headers, id) => headers.find((header) => header.f_pers_young_spec_id === +id)
);
