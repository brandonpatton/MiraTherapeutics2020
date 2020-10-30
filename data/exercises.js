const mongoose = require('mongoose')
const { Exercise } = require('./models/exercise');

module.exports = {
    async createExercise(mongoUri, exerciseData, exerciseTitle, exerciseType, dueDate, frequency, patientName, patientName, patientId, progress, specialInstructions) {
        await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
            if (err) console.error(err);
        })
        let newExercise = new Exercise({
            exerciseData: exerciseData,
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
        return await this.getexercise(mongoUri, id)
    },

    async getExercise(mongoUri, id) {
        await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
            if (err) console.error(err);
        })
        const exercise = await Exercise.findOne({_id: id})
        if (exercise === null) throw 'No exercise exists with that id'
        return exercise
    }

}