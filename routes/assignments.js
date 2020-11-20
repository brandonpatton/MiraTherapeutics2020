const express = require('express')
const router = express.Router()
const assignmentData = require('../data/methods/assignments');
const exerciseData = require('../data/methods/exercises')
const { Assignment } = require('../data/models/assignment');

router.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
        assignment = await assignmentData.getAssignment(id)
    } catch(e) {
        console.log(e)
    }
    return assignment
})

router.post('/', async (req, res) => {
    try {
        const newAssignment = await assignmentData.createAssignment(req.body);
        res.json(newAssignment);
    } catch(e) {
        console.log(e)
    }
})

router.post('/:id/edit', async (req, res) => {
    const id = req.params.id
    try {
        const updatedAssignment = await assignmentData.updateAssignment(id)
        res.json(updatedAssignment)
    } catch (e) {
        console.log(e)
    }
})

router.delete('/:id', async (req, res) => {
    const id = re.params.id
    try {
        var assignment = assignmentData.getAssignment(id)
        for(let exercise of assignment.exerciseList) {
            await exerciseData.removeExercise(exercise)
        }
        await assignmentData.removeAssignment(id)
        return true
    } catch (e) {
        console.log(e)
    }
})

module.exports = router;