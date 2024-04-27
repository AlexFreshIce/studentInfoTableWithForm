export const setPending = (state) => {
  state.status = "loading";
  state.error = null;
};

export const setError = (state, action) => {
  state.status = "rejected";
  state.error = action.payload;
};
