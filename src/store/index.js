// src/store/index.js
import { configureStore } from "@reduxjs/toolkit";
import featureBReducer from "./feature/featureCartSlice";

const store = configureStore({
  reducer: {
    featureCart: featureBReducer,
  },
});

export default store;
