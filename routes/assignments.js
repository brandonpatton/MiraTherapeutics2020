const express = require('express')
const router = express.Router()
const data = require('../data/methods')
const assignmentData = data.assignments
const { Assignment } = require('../data/models/assignment');

router.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
        assignment = await assignmentData.getAssignment(id)
    } catch {
        console.log(e)
    }
    return assignment
})

router.post('/', async (req, res) => {
    const newAssignment = new Assignment({
        exerciseList:req.params.exerciseList,
        dateAssigned:req.params.dateAssigned,
        patientName:req.params.patientName,
        patientId:req.params.patientId,
        therapistName:req.params.therapistName,
        therapistId:req.params.therapistId,
        assignmentProgress:req.params.assignmentProgress,
        visitNumber:req.params.visitNumber
    })
    try {
        await assignmentData.createAssignment(newAssignment)
    } catch {
        console.log(e)
    }
})