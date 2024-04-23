import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ENDPOINTS, customFetch } from "../../api";

const initialState = {
  data: [],
  status: null,
  error: null,
};

export const fetchLinesData = createAsyncThunk(
  "header/fetchLinesData",
  async function (_, { rejectWithValue }) {
    try {
      const response = await customFetch(ENDPOINTS.LINES);
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

export const formLinesDataSlice = createSlice({
  name: "lines",
  initialState,
  // reducers: {
  //   createHeader: (state, action) => {
  //     console.log(state.data);
  //     const lastId = state.data.lengths
  //       ? state.data.reduce((acc, el) => {
  //           return el.f_pers_young_spec_id > acc
  //             ? el.f_pers_young_spec_id
  //             : acc.f_pers_young_spec_id;
  //         }, 0)
  //       : 0;
  //     const newHeader = { f_pers_young_spec_id: lastId + 1, ...action.payload };
  //     state.data.push(newHeader);
  //   },
  //   updateHeader: (state, action) => {
  //     const headerIndex = state.data.findLastIndex(
  //       (header) =>
  //         header.f_pers_young_spec_id === action.payload.f_pers_young_spec_id
  //     );
  //     const newHeader = { ...state.data[headerIndex], ...action.payload };
  //     state.data[headerIndex] = newHeader;
  //   },
  //   hideHeaders: (state, action) => {
  //     if (state.hiddenHeaders.indexOf(action.payload) !== -1) {
  //       state.hiddenHeaders = state.hiddenHeaders.filter(
  //         (el) => el !== action.payload
  //       );
  //     } else {
  //       state.hiddenHeaders = [...state.hiddenHeaders, action.payload];
  //     }
  //   },
  // },

  extraReducers: (builder) => {
    builder
      .addCase(fetchLinesData.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchLinesData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "resolved";
      })
      .addCase(fetchLinesData.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "rejected";
      });
  },
});

// export const { createHeader, updateHeader, hideHeaders } =
// formLinesDataSlice.actions;

export default formLinesDataSlice.reducer;

export const selectFetchLinesDataStatus = (state) =>
  state.formLinesDataSlice.status;
export const selectLinesData = (state) =>
  state.formLinesDataSlice.data;
  export const selectLinesName = (state) =>
  state.formLinesDataSlice.data.map((el) => el.name);