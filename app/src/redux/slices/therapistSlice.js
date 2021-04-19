import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//import { postRecord } from "../../utils/lssApi";
// create postClient equivalent of this


/*
    id: "",
    name: "initial name",
    clientSince: "",
    nextSession: "",
    loading: "idle",
    currentRequestId: undefined

    {
        "PjohnDoe1": [
            {
                Assignment1
            },
            {
                Assignment2
            }
        ],

        "PpattyPancakes1": [
            {
                Assignment1
            },
            {
                Assignment2
            }
        ]
    }

*/


const therapistSlice = createSlice({
  name: "therapist",
  initialState: {
    therapist: {
      id: "",
      clientInfo: {} //client list mapped by patient ids
    },
  },
  reducers: {
    updateTherapistClientList: (state, action) => {
      state.therapist.clientInfo = action.payload.clientInfo;
    },

    addAssignmentToClient: (state, action) => {
        let patientId = action.payload.assignment.patientId;
        let assignment = action.payload.assignment;
        state.therapist.clientInfo[patientId].push(assignment)
    },

    completeClientAssignment: (state, action) => {
        let patientId = action.payload.assignment.patientId;
        // Find the index of the assignment that matches the supplied assignment ID for the supplied patient ID
        let targetIndex = state.therapist.clientInfo[patientId].findIndex((assignment) => assignment._id == action.payload.assignment._id);
        // Update the completedByTherapist field of the assignment at targetIndex to indicate that the therapist marked it as completed
        state.therarpist.clientInfo[patientId][targetIndex].completedByTherapist = true;

    }
  },
  extraReducers: {
    
  },
});

export const { updateTherapistClientList, addAssignmentToClient, completeClientAssignment } = therapistSlice.actions;

export default therapistSlice.reducer;
