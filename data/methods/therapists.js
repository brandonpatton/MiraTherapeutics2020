const mongoose = require('mongoose');
const { Patient } = require('../models/patients');
const { Therapist } = require('../models/therapists');

module.exports = {
    async getPatientsByTherapistId(therapistId) {
        try {
            const therapist = await this.getTherapist(therapistId)
            const patientsOfTherapist = await Patient.find({therapistId: therapistId})
            return patientsOfTherapist
        } catch (e) {
            throw `${e}`
        }
    },

    async getTherapist(therapistId) {
        if (!therapistId) throw 'No ID provided'
        try {
            const therapist = await Therapist.findOne({_id: therapistId})
            if (therapist=== null) throw 'No therapist exists with that id'
            return therapist
        } catch (e) {
            throw `${e}`
        }
    }
}