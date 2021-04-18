const express = require('express')
const multer  = require('multer')
const router = express.Router()
const exerciseData = require('../data/methods/exercises')
const upload = multer({ dest: 'uploads/'})
var fs = require('fs');
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
// import { v4 as uuidv4 } from 'uuid';



router.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const exercise = await exerciseData.getExercise(id)
        res.json(exercise)
    } catch(e) {
        res.status(500).json({"Error": e})
        console.log(e)
    }
})

router.post('/', async (req, res) => {
    const exerciseId = req.params.id
    try {
        const newExercise = await exerciseData.createExercise(req.body);
        res.json(newExercise);
    } catch(e) {
        res.status(500).json({"Error": e})
        console.log(e)
    }
})

router.post('/:id/edit', async (req, res) => {
    const id = req.params.id
    try {
        const updatedExercise = await exerciseData.updateExercise(id, req.body)
        res.json(updatedExercise)
    } catch (e) {
        res.status(500).json({"Error": e})
        console.log(e)
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    try {
        var exercise = await exerciseData.getExercise(id)
        await exerciseData.removeExercise(id)
        res.json({"Removed": true})
    } catch (e) {
        res.status(500).json({"Error": e})
        console.log(e)
    }
})

router.post('/upload', upload.single("picture"), async function (req,res) {
    try {
        var src = fs.createReadStream(req.file.path);
        var imageId = uuidv4();
        await exerciseData.uploadFile(imageId + ".jpg",src); //Do we need an extension?
        console.log(imageId);
        res.json(imageId);
    } catch (e) {
        console.log(e);
        res.status(500).json({"Error": e});
    }
    

    
    // console.log("Received file" + req.file.originalname);
    // var src = fs.createReadStream(req.file.path);
    // var dest = fs.createWriteStream('uploads/' + req.file.originalname);
    // src.pipe(dest);
    // src.on('end', function() {
    // 	fs.unlinkSync(req.file.path);
    // 	res.json('OK: received ' + req.file.originalname);
    // });
    // src.on('error', function(err) { res.json('Something went wrong!'); });
  })


module.exports = router;