const mongoose = require('mongoose')
const { Exercise } = require('../models/exercise');
const Assignments = require('./assignments')
const fs = require('fs');
const AWS = require('aws-sdk');
require('dotenv').config()

module.exports = {
    async createExercise(exercise) {
        let newExercise = new Exercise({
            exerciseTitle: exercise.exerciseTitle,
            exerciseType: exercise.exerciseType,
            dueDate: exercise.dueDate,
            frequency: exercise.frequency,
            patientName: exercise.patientName,
            patientId: exercise.patientId,
            progress: exercise.progress,
            specialInstructions: exercise.specialInstructions,
            goal:exercise.goal,
            results: '',
            imageId: '',
            dateOfLastProgress: ''
        });
        const insertInfo = await newExercise.save();
        if (insertInfo.errors) throw `Could not add exercise. Error: ${insertInfo.errors}`
        const id = insertInfo._id
        return await this.getExercise(id)
    },

    async getExercise(id) {
        const exercise = await Exercise.findOne({_id: id})
        if (exercise === null) throw 'No exercise exists with that id'
        return exercise
    },    
    async updateExercise(id, newExercise){
        const updatedInfo = await Exercise.updateOne({ _id: id}, { 
            exerciseTitle: newExercise.exerciseTitle,
            exerciseType: newExercise.exerciseType,
            dueDate: newExercise.dueDate,
            frequency: newExercise.frequency,
            patientName: newExercise.patientName,
            patientId: newExercise.patientId,
            progress: newExercise.progress,
            specialInstructions: newExercise.specialInstructions,
            goal:newExercise.goal,
            results: newExercise.results,
            imageId: newExercise.imageId,
            dateOfLastProgress: dateOfLastProgress
        })
        if (updatedInfo.error) throw `Could not update exercise. Error: ${updatedInfo.errors}`
        
        if(newExercise.progress == newExercise.goal){
            
            let assignments = await Assignments.getAssignmentsByPatientId(newExercise.patientId)
            let assign

            for(i=0; i<assignments.length;i++){
                for(j=0; j<assignments[i].exerciseList.length;j++){
                    if(assignments[i].exerciseList[j].id=id){
                        assign = assignments[i]
                    }
                }
                
            }
            let temp = assign.assignmentProgress

            temp = temp + 1
            assign.assignmentProgress = temp
            
            Assignments.updateAssignment(assign.id, assign)
        }
        return await this.getExercise(id);
    },
    async removeExercise(id){
        //const exercise = await this.getExercise(id) 
        //const patientAssignments = await Assignments.getAssignmentsByPatientId(exercise.patientId)
       // if(patientAssignments.exerciseList.includes(id)){
        //    const index = patientAssignments.exerciseList.indexOf(id)
        //    patientAssignments.exerciseList.splice(index,1)
       // }
        const delExercise = await Exercise.deleteOne({_id: id})
        //if(delExercise.deletedCount == 0) throw `Could not delete exercise. Error: ${delExercise.errors}`
        if(delExercise.deletedCount == 0) throw `No exercise exists with that ID`

        return `Removed exercise with id:${id}`
    },
    async uploadFile(fileName, fileContent) {
        const id = process.env.AWS_ACCESS_KEY;
        const secret = process.env.AWS_SECRET_KEY;
        const bucketName = process.env.AWS_BUCKET_NAME

        const s3 = new AWS.S3({
            accessKeyId: id,
            secretAccessKey: secret
        });

        const params = {
            Bucket: bucketName,
            Key: fileName, // File name you want to save as in S3
            Body: fileContent
        };

        // Uploading files to the bucket
        const result = await s3.upload(params, function(err, data) {
            if(err) {
                throw err;
            }
            console.log(`File uploaded successfully. ${data.Location}`);
        });
        //console.log(result);
    
    },

    async getFile(imageId) {
        const id = process.env.AWS_ACCESS_KEY;
        const secret = process.env.AWS_SECRET_KEY;
        const bucketName = process.env.AWS_BUCKET_NAME

        const s3 = new AWS.S3({
            accessKeyId: id,
            secretAccessKey: secret
        });

        const params = {
            Bucket: bucketName,
            Key: imageId + ".jpg", // File name you want to save as in S3
        };

        const result = await s3.getObject(params, function(err, data) {
            if(err) {
                throw err;
            }
            console.log(`File received`);
            console.log(data)
            return data;
        })
        
    }
}