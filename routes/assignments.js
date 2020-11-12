const express = require('express')
const router = express.Router()
const data = require('../data/methods')
const assignmentData = require('../data/methods/assignments');
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

module.exports = router;