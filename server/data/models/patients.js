const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    patientName: String,
    patientEmail: String,
    therapistId: String,
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = {Patient}