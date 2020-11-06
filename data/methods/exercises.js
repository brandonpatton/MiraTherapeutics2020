const mongoose = require('mongoose')
const { Exercise } = require('../models/exercise');

module.exports = {
    async createExercise(mongoUri, exerciseTitle, exerciseType, dueDate, frequency, patientName, patientId, progress, specialInstructions) {
        await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
            if (err) console.error(err);
        })
        let newExercise = new Exercise({
            exerciseTitle: exerciseTitle,
            exerciseType: exerciseType,
            dueDate: dueDate,
            frequency: frequency,
            patientName: patientName,
            patientId: patientId,
            progress: progress,
            specialInstructions: specialInstructions
        });
        const insertInfo = await newExercise.save();
        if (insertInfo.errors) throw `Could not add exercise. Error: ${insertInfo.errors}`
        const id = insertInfo._id
        return await this.getExercise(mongoUri, id)
    },

    async getExercise(mongoUri, id) {
        await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
            if (err) console.error(err);
        })
        const exercise = await Exercise.findOne({_id: id})
        if (exercise === null) throw 'No exercise exists with that id'
        return exercise
    },
    async removeExercise(mongoUri, id){
        await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
            if (err) console.error(err);
        })
        const exercise = await Exercise.deleteOne({_id: id})
        if(Exercise.deletedCount == 0){
            throw 'No exercise exists with that id'
            }
        return `Deleted exercise with id:${id}`
    }

}