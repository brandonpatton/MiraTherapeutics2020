const mongoCollections = require('../config/mongoCollections')
const assignments = mongoCollections.assignments

module.exports = {
    async createAssignment(exerciseList, dateAssigned, patientName, patientId, therapistName, therapistId, assignmentProgress, visitNumber) {
        const assignmentCollection = await assignments()
        let newAssignment = {
            exerciseList:exerciseList,
            dateAssigned:dateAssigned,
            patientName:patientName,
            patientId:patientId,
            therapistName:therapistName,
            therapistId:therapistId,
            assignmentProgress:assignmentProgress,
            visitNumber:visitNumber
        }
        const insertInfo = await assignmentCollection.insertOne(newAssignment)
        if (insertInfo.insertedCount === 0) throw 'Could not create assignment'
        const id = insertInfo.insertedId
        return await this.getAssignment(id)
    },

    async getAssignment(id) {
        const assignmentCollection = await assignments()
        const assignment = await assignmentCollection.findOne({_id: id})
        if (assignment === null) throw 'No assignment exists with that id'
        return assignment
    },
	async removeAssignment(id){
		const assignmentCollection = await assignments()
		const Assignment = await assignmentCollection.deleteOne({_id: id})
		if(Assignment.deletedCount == 0){
			throw 'No assignment exists with that id'
		}
	return `Successfully removed assignment with id:${id}`
	}
}
