const mongoose = require('mongoose')
const { Assignment } = require('../models/assignment');
const { Exercise } = require('./exercises');

module.exports = {
    async createAssignment(mongoUri, assignment) {
        await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
            if (err) console.error(err);
        })
        let newAssignment = new Assignment({
            exerciseList:assignment.exerciseList,
            dateAssigned:assignment.dateAssigned,
            patientName:assignment.patientName,
            patientId:assignment.patientId,
            therapistName:assignment.therapistName,
            therapistId:assignment.therapistId,
            assignmentProgress:assignment.assignmentProgress,
            visitNumber:assignment.visitNumber
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
    },
    async removeAssignment(mongoUri, id){
        await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
            if (err) console.error(err);
        })
        const assignmentCollection = await assignments()
        const Assignment = await assignmentCollection.deleteOne({_id: id})
        if(Assignment.deletedCount == 0){
        throw 'No assignment exists with that id'
        }
        for(i=0;i<length.exerciseList;i++){
            Exercise.removeExercise(mongoUri, exerciseList[i].id)
        }


    return `Successfully removed assignment with id:${id}`
    },
    
    async getAssignmentsByPatientId(mongoUri, patientIdInput){
        await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
            if (err) console.error(err);
        })
        const assignments = await Assignment.find({patientId: patientIdInput})
        if (assignments === null) throw 'No assignment exists with that patientId'
        return assignments
    }
}

