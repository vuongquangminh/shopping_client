// src/store/index.js
import { configureStore } from "@reduxjs/toolkit";
import featureAReducer from "./feature/featureASlice";
import featureBReducer from "./feature/featureCartSlice";

const store = configureStore({
  reducer: {
    featureA: featureAReducer,
    featureCart: featureBReducer,
  },
});

export default store;
