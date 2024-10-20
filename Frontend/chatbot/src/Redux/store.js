import { configureStore } from "@reduxjs/toolkit";
import responseReducer from "./Slices/responseSlice"; // Import your slice

const store = configureStore({
  reducer: {
    responses: responseReducer, // Add your responses slice to the store
  },
});

export default store;
