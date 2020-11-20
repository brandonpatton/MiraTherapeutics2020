const express = require('express')
const router = express.Router()
const exerciseData = require('../data/methods/exercises')

router.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
        exercise = await exerciseData.getExercise(id)
    } catch(e) {
        console.log(e)
    }
    return exercise
})

router.post('/:id', async (req, res) => {
    const exerciseId = req.params.id
    try {
        const newExercise = await exerciseData.createExercise(req.body);
        res.json(newExercise);
    } catch(e) {
        console.log(e)
    }
})

router.post('/:id/edit', async (req, res) => {
    const id = req.params.id
    try {
        const updatedExercise = await exerciseData.updateExercise(id)
        res.json(updatedexercise)
    } catch (e) {
        console.log(e)
    }
})

router.delete('/:id', async (req, res) => {
    const id = re.params.id
    try {
        var exercise = exerciseData.getExercise(id)
        await exerciseData.removeExercise(id)
        return true
    } catch (e) {
        console.log(e)
    }
})

module.exports = router;