import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//import { postRecord } from "../../utils/lssApi";
// create postClient equivalent of this

// is currentRequestId like a unique ID for each request so the response can be connected to the request

// closeAssignment?
export const closeClient = createAsyncThunk(
  "clients/closeClient",
  async (_, { getState, requestId }) => {
    const { loading, currentRequestId } = getState().client;
    if (loading !== "pending" || currentRequestId !== requestId) {
      return null;
    }
    return postAssignment(getState().assignments, getState().auth.user);
  }
);

const assignmentSlice = createSlice({
  name: "assignment",
  initialState: {
        dateAssigned: new Date(),
        visitNumber: 0,
        therapistName: "",
        patientId: "",
        clientName: "",
        due: '',
        status: '',
        nextSession: "",
        exercises: [
            {
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
        ]
  },
  reducers: {
    openClient: (state, action) => {
      state.patientId = action.payload;
    },
    changeActiveAssignment: (state, action) => {
      state.selectedAssignment = action.payload;
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
  changeActiveAssignment,
} = assignmentSlice.actions;

export default assignmentSlice.reducer;
