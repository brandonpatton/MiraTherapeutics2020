import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { closeAssignment } from "../../api/clientAPI";
import { closeClient } from "./clientSlice";
//import { postRecord } from "../../utils/lssApi";
// create postClient equivalent of this

// is currentRequestId like a unique ID for each request so the response can be connected to the request

// closeAssignment?
/*export const closeClient = createAsyncThunk(
  "clients/closeClient",
  async (_, { getState, requestId }) => {
    const { loading, currentRequestId } = getState().client;
    if (loading !== "pending" || currentRequestId !== requestId) {
      return null;
    }
    return postAssignment(getState().assignments, getState().auth.user);
  }
);*/
closeClient()

const assignmentSlice = createSlice({
  name: "assignment",
  initialState: {
    currentAssignment: {
        dateAssigned: new Date(),
        visitNumber: 0,
        therapistName: "",
        patientId: "",
        clientName: "",
        due: new Date(),
        status: '',
        nextSession: new Date(),
        exerciseList: [],
        chosenExercise: {}
      },
  },
  reducers: {
    openAssignment: (state, action) => {
      state.currentAssignment = action.payload.assignment;
      state.currentAssignment.chosenExercise = action.payload.chosenExercise
    },
    addExercise: (state, action) => {
      let exercise = action.payload.exercise;
      state.currentAssignment.exerciseList.push(exercise);
    },
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
  openAssignment,
  addExercise
} = assignmentSlice.actions;

export default assignmentSlice.reducer;
