const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
    exerciseTitle: String,
    exerciseType: String,
    dueDate: Date,
    frequency: String,
    patientName: String,
    patientId: String,
    progress: Number,
    specialInstructions: String
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = {Exercise}