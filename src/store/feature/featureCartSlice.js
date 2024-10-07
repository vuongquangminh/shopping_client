// src/store/featureBSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import request from "../../utils/request";

// Thunk để gọi API

export const fetchDataCart = createAsyncThunk(
  "data/fetchData",
  async (user_id) => {
    const response = await request.post(`cart/${user_id}`);
    return response.data;
  }
);

const initialState = {
  items: [],
  status: "idle", // idle | loading | succeeded | failed
  error: null,
};

const featureCartSlice = createSlice({
  name: "featureCart",
  initialState,
  reducers: {
    increase: (state) => {
      state.value += 10;
    },
    decrease: (state) => {
      state.value -= 10;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDataCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchDataCart.rejected, (state, action) => {
        console.log("action: ", action);
        state.status = "failed";
        state.error = "Lấy dũ liệu giỏ hàng không thành công";
      });
  },
});

export const { increase, decrease } = featureCartSlice.actions;
export default featureCartSlice.reducer;
