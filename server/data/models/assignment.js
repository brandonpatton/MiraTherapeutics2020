const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    exerciseList: Array,
    dateAssigned: Date,
    due: Date,
    patientName: String,
    patientId: String,
    therapistName: String,
    therapistId: String,
    assignmentProgress: Number,
    visitNumber: Number,
    overallInstructions: String,
    completedByTherapist: Boolean
});

const Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = {Assignment}