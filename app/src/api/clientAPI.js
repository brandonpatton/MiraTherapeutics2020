import { __esModule } from "redux-persist/lib/storage/createWebStorage"

export const getAssignments = async (patientID) => {
    let assignments = await fetch(`http://localhost:3080/assignments/patient/${patientID}`)
    assignments = await assignments.json()
    assignments.sort((a, b) => a.visitNumber - b.visitNumber)
    return assignments
}

export const closeAssignment = async (assignmentObject) => {
    // mark the assignment as completed by the therapist
    assignmentObject.completedByTherapist = true
    const postSettings = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(assignmentObject),
      }

      await fetch(`http://localhost:3080/assignments/${assignmentObject._id}/edit`, postSettings)
}