const mongoose = require('mongoose')
const { Assignment } = require('../models/assignment');
const { Exercise } = require('./exercises');

module.exports = {
    async createAssignment(assignment) {
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
        return await this.getAssignment(id)
    },

    async getAssignment(id) {
        const assignment = await Assignment.findOne({_id: id})
        if (assignment === null) throw 'No assignment exists with that id'
        return assignment
    },
    async removeAssignment(id){
        //const assignmentCollection = await assignments()
        const assignment = await Assignment.deleteOne({_id: id})
        if(assignment.deletedCount == 0){
        throw 'No assignment exists with that id'
        }
        //for(i=0;i<length.exerciseList;i++){
          //  Exercise.removeExercise(mongoUri, exerciseList[i].id)
       // }


        return `Successfully removed assignment with id:${id}`
    },

    async updateAssignment(id, newAssignment) {
        var i
        let sumProgress = 0
        for(i = 0; i < newAssignment.exerciseList.length; i++){
            sumProgress = sumProgress + newAssignment.exerciseList[i]
        }
        let total = i+1
        let totalProgress = sumProgress/total
        await Assignment.updateOne({ _id: id}, {
            exerciseList: newAssignment.exerciseList,
            dateAssigned: newAssignment.dateAssigned,
			patientName: newAssignment.patientName,
			patientId: newAssignment.patientId,
			therapistName: newAssignment.therapistName,
			therapistId: newAssignment.therapistId,
			assignmentProgress: totalProgress,
			visitNumber: newAssignment.visitNumber
        })
        return await this.getAssignment(id);

    },
    
    async getAssignmentsByPatientId(patientIdInput){
        const assignments = await Assignment.find({patientId: patientIdInput})
        if (assignments === null) throw 'No assignment exists with that patientId'
        return assignments
    }
}

