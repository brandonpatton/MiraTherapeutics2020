const mongoose = require('mongoose');

const therapistSchema = new mongoose.Schema({
    therapistName: String,
    therapistEmail: String
});

const Therapist = mongoose.model('Therapist', therapistSchema);

module.exports = {Therapist}