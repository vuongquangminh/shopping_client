import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: 0 };

const featureASlice = createSlice({
  name: "featureA",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

export const { increment, decrement } = featureASlice.actions;
export default featureASlice.reducer;
