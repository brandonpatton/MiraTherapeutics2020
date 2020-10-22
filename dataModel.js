const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/test", {useNewUrlParser:true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function(){
    // connected
    const assignmentSchema = new mongoose.Schema({
        exerciseList: Array,        // Array of IDs or objects?
        dateAssigned: Date,
        patientName: String,        // Do we need name and ID?
        patientID: String,
        therapistName: String,      // Do we need name and ID?
        therapistID: String,
        assignmentProgress: Number,
        visitNumber: Number         // Count the number of visits so far
    });

    const exerciseSchema = new mongoose.Schema({
        exerciseData: String,      // key to exercises in cloud
        exerciseTitle: String,     // this and the below would be passed in as a variable from form, except for "done"
        exerciseType: String,
        dueDate: Date,
        frequency: String,
        patientName: String,
        patientID: String,
        progress: Number,
        specialInstructions: String
    });

    const Grounding = mongoose.model("Grounding", assignmentSchema)
    const flashback = new Grounding({
        exerciseData: "flashbackKey",
        exerciseTitle: "Flashback Grounding",     // this and the below would be passed in as a variable from form, except for "done"
        exerciseType: "Grounding",
        dueDate: new Date(Date.now() + 12096e5),    // Right now plus two weeks
        frequency: "Weekly",
        patientName: "Liam",
        patientID: "uniqueIdentifier",
        progress: 0,
        specialInstructions: "Please let me know if you need any help!"
    });

    flashback.save(function (err, flashback) {
    });
    
});
