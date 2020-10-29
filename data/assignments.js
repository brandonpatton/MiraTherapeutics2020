const mongoose = require('mongoose')
const { Assignment } = require('./models/assignment');

module.exports = {
    async createAssignment(mongoUri, exerciseList, dateAssigned, patientName, patientId, therapistName, therapistId, assignmentProgress, visitNumber) {
        await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
            if (err) console.error(err);
        })
        let newAssignment = new Assignment({
            exerciseList:exerciseList,
            dateAssigned:dateAssigned,
            patientName:patientName,
            patientId:patientId,
            therapistName:therapistName,
            therapistId:therapistId,
            assignmentProgress:assignmentProgress,
            visitNumber:visitNumber
        });
        const insertInfo = await newAssignment.save();
        if (insertInfo.errors) throw `Could not add assignment. Error: ${insertInfo.errors}`
        const id = insertInfo._id
        return await this.getAssignment(mongoUri, id)
    },

    async getAssignment(mongoUri, id) {
        await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
            if (err) console.error(err);
        })
        const assignment = await Assignment.findOne({_id: id})
        if (assignment === null) throw 'No assignment exists with that id'
        return assignment
    }

}