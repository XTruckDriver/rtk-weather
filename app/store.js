"use client";
import { configureStore } from "@reduxjs/toolkit";
import cityListReducer from "./features/cityList/cityListSlice";

const store = configureStore({
  reducer: {
    cityList: cityListReducer,
  },
});

// store.subscribe(() => {
//   console.log("Store State: ", store.getState());
// });

export default store;
