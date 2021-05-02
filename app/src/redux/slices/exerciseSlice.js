import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//import { postRecord } from "../../utils/lssApi";
// create postClient equivalent of this

// is currentRequestId like a unique ID for each request so the response can be connected to the request

const exerciseSlice = createSlice({
  name: "exercise",
  initialState: {
    chosenExercise: {
        exerciseTitle: "",
        exerciseType: "",
        dueDate: new Date(),
        frequency: "",
        patientName: "",
        patientId: "",
        progress: 0,
        specialInstructions: "",
        goal: 0
    },
    exerciseToEdit: {},
    added: [{
        exerciseTitle: "",
        exerciseType: "",
        dueDate: new Date(),
        frequency: "",
        patientName: "",
        patientId: "",
        progress: 0,
        specialInstructions: "",
        goal: 0
    }],
    nextSession: new Date()
  },
  reducers: {
    openClient: (state, action) => {
      state.chosenExercise.patientId = action.payload;
    },
    changeActiveExercise: (state, action) => {
      state.chosenExercise = action.payload;
    }
  },
  extraReducers: {
    [closeClient.pending]: (state, action) => {
      if (state.loading === "idle") {
        state.loading = "pending";
        state.currentRequestId = action.meta.requestId;
      }
    },
    [closeClient.fulfilled]: (state, action) => {
      if (
        state.loading === "pending" &&
        state.currentRequestId === action.meta.requestId
      ) {
        state.loading = "idle";
        state.currentRequestId = undefined;
      }
    },
    [closeClient.rejected]: (state, action) => {
      if (
        state.loading === "pending" &&
        state.currentRequestId === action.meta.requestId
      ) {
        state.loading = "idle";
        state.currentRequestId = undefined;
      }
    }
  }
});

export const {
  openClient,
  changeActiveExercise,
} = exerciseSlice.actions;

export default exerciseSlice.reducer;
