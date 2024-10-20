import { createSlice } from "@reduxjs/toolkit";

// You can remove enableMapSet() if you're not using Map or Set in the Redux state anymore
// import { enableMapSet } from "immer";

// enableMapSet();  // No need to enable this now if avoiding Set

const initialState = {
  responses: [], // Array to hold the responses
  savedResponses: [], // Change this to an array or object instead of Set
};

const responseSlice = createSlice({
  name: "responses",
  initialState,
  reducers: {
    saveResponse: (state, action) => {
      // Add the response to the state
      state.responses.push(action.payload);

      // Check if response content is already saved to avoid duplicates
      if (!state.savedResponses.includes(action.payload.content)) {
        state.savedResponses.push(action.payload.content); // Add the response content to savedResponses array
      }
    },
    clearResponses: (state) => {
      // Clear all responses from the state
      state.responses = [];
      state.savedResponses = []; // Clear savedResponses array
    },
  },
});

// Export the actions
export const { saveResponse, clearResponses } = responseSlice.actions;

// Export the reducer
export default responseSlice.reducer;
