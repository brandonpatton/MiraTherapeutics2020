const mongoose = require('mongoose');
const { Exercise } = require('../models/exercise');
const assignment = require('./assignments')

module.exports = {
    async createExercise(exercise) {
        let newExercise = new Exercise({
            exerciseTitle: exercise.exerciseTitle,
            exerciseType: exercise.exerciseType,
            dueDate: exercise.dueDate,
            frequency: exercise.frequency,
            patientName: exercise.patientName,
            patientId: exercise.patientId,
            progress: exercise.progress,
            specialInstructions: exercise.specialInstructions
        });
        const insertInfo = await newExercise.save();
        if (insertInfo.errors) throw `Could not add exercise. Error: ${insertInfo.errors}`
        const id = insertInfo._id
        return await this.getExercise(id)
    },

    async getExercise(id) {
        const exercise = await Exercise.findOne({_id: id})
        if (exercise === null) throw 'No exercise exists with that id'
        return exercise
    },
    async updateExercise(id, newExercise){
        const exercise = await this.getExercise(id)
        const updatedInfo = await Exercise.updateOne({ _id: id}, { 
            exerciseTitle: newExercise.exerciseTitle,
            exerciseType: newExercise.exerciseType,
            dueDate: newExercise.dueDate,
            frequency: newExercise.frequency,
            patientName: newExercise.patientName,
            patientId: newExercise.patientId,
            progress: newExercise.progress,
            specialInstructions: newExercise.specialInstructions
        })
        if (updatedInfo.error) throw `Could not update exercise. Error: ${updatedInfo.errors}`
        return await this.getExercise(id);
    },
    async removeExercise(id){
        const exercise = await this.getExercise(id) 
        const patientAssignments = await assignment.getAssignmentsByPatientId(exercise.patientId)
        if(patientAssignments.exerciseList.includes(id)){
            const index = patientAssignments.exerciseList.indexOf(id)
            patientAssignments.exerciseList.splice(index,1)
        }
        const delExercise = await Exercise.deleteOne({_id: id})
        if(delExercise.error) throw `Could not delete exercise. Error: ${delExercise.errors}`
        

        return `Removed exercise with id:${id}`
    }

}