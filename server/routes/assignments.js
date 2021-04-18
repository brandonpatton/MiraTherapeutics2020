const express = require('express')
const router = express.Router()
const assignmentData = require('../data/methods/assignments');
const exerciseData = require('../data/methods/exercises');
const assignment = require('../data/models/assignment');
const { Assignment } = require('../data/models/assignment');

router.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const assignment = await assignmentData.getAssignment(id)
        res.json(assignment)
        return assignment
    } catch(e) {
        res.status(500).json({"Error": e})
        console.log(e)
    }
})

router.post('/', async (req, res) => {
    try {
        const newAssignment = await assignmentData.createAssignment(req.body);
        res.json(newAssignment);
    } catch(e) {
        res.status(500).json({"Error": e})
        console.log(e)
    }
})

router.post('/:id/edit', async (req, res) => { //may want to make it a patch
    const id = req.params.id
    try {
        const updatedAssignment = await assignmentData.updateAssignment(id, req.body)
        res.json(updatedAssignment)
    } catch (e) {
        res.status(500).json({"Error": e})
        console.log(e)
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    try {
        var assignment = await assignmentData.getAssignment(id)
        for(let exercise in assignment.exerciseList) {
            await exerciseData.removeExercise(assignment.exerciseList[exercise]._id)
        }
        await assignmentData.removeAssignment(id)
        res.json({"Removed": true})
    } catch (e) {
        res.status(500).json({"Error": e})
        console.log(e)
    }
})

module.exports = router;