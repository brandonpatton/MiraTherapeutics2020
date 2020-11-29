const express = require('express')
const router = express.Router()
const exerciseData = require('../data/methods/exercises')

router.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const exercise = await exerciseData.getExercise(id)
        res.json(exercise)
    } catch(e) {
        res.status(500).json({"Error": e})
        console.log(e)
    }
})

router.post('/', async (req, res) => {
    const exerciseId = req.params.id
    try {
        const newExercise = await exerciseData.createExercise(req.body);
        res.json(newExercise);
    } catch(e) {
        res.status(500).json({"Error": e})
        console.log(e)
    }
})

router.post('/:id/edit', async (req, res) => {
    const id = req.params.id
    try {
        const updatedExercise = await exerciseData.updateExercise(id, req.body)
        res.json(updatedExercise)
    } catch (e) {
        res.status(500).json({"Error": e})
        console.log(e)
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    try {
        var exercise = await exerciseData.getExercise(id)
        await exerciseData.removeExercise(id)
        res.json({"Removed": true})
    } catch (e) {
        res.status(500).json({"Error": e})
        console.log(e)
    }
})

module.exports = router;