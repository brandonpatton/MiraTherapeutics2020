import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//import { postRecord } from "../../utils/lssApi";
// create postClient equivalent of this

// is currentRequestId like a unique ID for each request so the response can be connected to the request

// closeAssignment
export const closeClient = createAsyncThunk(
  "clients/closeClient",
  async (_, { getState, requestId }) => {
    const { loading, currentRequestId } = getState().client;
    if (loading !== "pending" || currentRequestId !== requestId) {
      return null;
    }
    return postClient(getState().clients, getState().auth.user);
  }
);

const clientSlice = createSlice({
  name: "client",
  initialState: {
    clientId: "",
    /*score: 0,
    maxScore: 100,*/
    clientName: "",
    assignments: [],
    clientSince: "",
    nextSession: "",
    selectedAssignment: {},
    //eventLogs: [],
    //errors: [],
    loading: "idle",
    currentRequestId: undefined
  },
  reducers: {
    openClient: (state, action) => {
      state.clientId = action.payload;
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
} = clientSlice.actions;

export default clientSlice.reducer;
