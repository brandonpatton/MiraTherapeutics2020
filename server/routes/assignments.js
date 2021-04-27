const express = require("express");
const router = express.Router();
const assignmentData = require("../data/methods/assignments");
const exerciseData = require("../data/methods/exercises");
const assignment = require("../data/models/assignment");
const { Assignment } = require("../data/models/assignment");

/*

 TODO: Need to add a route, where given an array of client ids, return json object with assigments and exercises

*/

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const assignment = await assignmentData.getAssignment(id);
    res.json(assignment);
    return assignment;
  } catch (e) {
    res.status(500).json({ Error: e });
    console.log(e);
  }
});

// Returns an object that maps supplied patient IDs to assignment lists
router.post("/patient/batch", async (req, res) => {
  const patientIds = req.body.patientIds
  if (patientIds.length === 0) {
    res.status(400).json({Error: "No IDs provided"})
    return
  }
  try {
    let idToAssignmentList  = await assignmentData.getAssignmentsByBatchPatientIds(patientIds)
    res.json(idToAssignmentList)
  } catch (e) {
    res.status(500).json({Error: e})
  }
})

// get all assignments for given client ID
router.get("/patient/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const assignment = await assignmentData.getAssignmentsByPatientId(id);
    res.json(assignment);
    return assignment;
  } catch (e) {
    res.status(500).json({ Error: e });
    console.log(e);
  }
});

router.post("/", async (req, res) => {
  try {
    let newAssignment = req.body
    const exerciseList = await exerciseData.createExerciseBatch(req.body.exerciseList)
    newAssignment.exerciseList = exerciseList
    newAssignment = await assignmentData.createAssignment(newAssignment);
    res.json(newAssignment);
  } catch (e) {
    res.status(500).json({ Error: e });
    console.log(e);
  }
});

router.post("/:id/edit", async (req, res) => {
  const id = req.params.id;
  try {
    const updatedAssignment = await assignmentData.updateAssignment(
      id,
      req.body
    );
    res.json(updatedAssignment);
  } catch (e) {
    res.status(500).json({ Error: e });
    console.log(e);
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    var assignment = await assignmentData.getAssignment(id);
    for (let exercise in assignment.exerciseList) {
      await exerciseData.removeExercise(assignment.exerciseList[exercise]._id);
    }
    await assignmentData.removeAssignment(id);
    res.json({ Removed: true });
  } catch (e) {
    res.status(500).json({ Error: e });
    console.log(e);
  }
});

module.exports = router;
