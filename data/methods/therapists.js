const mongoose = require('mongoose');
const { Patient } = require('../models/patients');
const { Therapist } = require('../models/therapists');

module.exports = {
    async getPatientsByTherapistId(therapistId) {
        if (!therapistId) throw 'No ID provided'
        const therapist = await this.getTherapist(therapistId)
        const patientsOfTherapist = await Patient.find({therapistId: therapistId})
        return patientsOfTherapist
    },

    async getTherapist(therapistId) {
        if (!therapistId) throw 'No ID provided'
        const therapist = await Therapist.findOne({_id: therapistId})
        if (therapist=== null) throw 'No therapist exists with that id'
        return therapist
        
    }
}