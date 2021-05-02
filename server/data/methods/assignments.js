const mongoose = require('mongoose')
const { Assignment } = require('../models/assignment');

module.exports = {
    async createAssignment(assignment) {
        let newAssignment = new Assignment({
            exerciseList:assignment.exerciseList,
            dateAssigned:assignment.dateAssigned,
            due: assignment.due,
            patientName:assignment.patientName,
            patientId:assignment.patientId,
            therapistName:assignment.therapistName,
            therapistId:assignment.therapistId,
            assignmentProgress:assignment.assignmentProgress,
            visitNumber:assignment.visitNumber,
            overallInstructions: assignment.overallInstructions,
            completedByTherapist: assignment.completedByTherapist
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


        return `Successfully removed assignment with id:${id}`
    },

    async updateAssignment(id, newAssignment) {
        const updatedAssignment = await Assignment.updateOne({ _id: id}, {
            exerciseList: newAssignment.exerciseList,
            dateAssigned: newAssignment.dateAssigned,
            due: newAssignment.due,
			patientName: newAssignment.patientName,
			patientId: newAssignment.patientId,
			therapistName: newAssignment.therapistName,
			therapistId: newAssignment.therapistId,
			assignmentProgress: newAssignment.assignmentProgress,
			visitNumber: newAssignment.visitNumber,
            overallInstructions: newAssignment.overallInstructions,
            completedByTherapist: newAssignment.completedByTherapist
        })
        if (updatedAssignment.updatedCount === 0) throw 'Could not update assignment'
        return await this.getAssignment(id);

    },
    
    async getAssignmentsByPatientId(patientIdInput){
        const assignments = await Assignment.find({patientId: patientIdInput})
        assignments.sort((a, b) => b.visitNumber - a.visitNumber)
        if (assignments.length === 0) throw 'No assignment exists with that patientId'
        return assignments
    },

    async getAssignmentsByBatchPatientIds(patientIds) {
        let idToAssignmentList = {}
        for (let patientId of patientIds) {
            let assignmentList = await this.getAssignmentsByPatientId(patientId)
            idToAssignmentList[patientId] = assignmentList
        }

        return idToAssignmentList
    }
}

