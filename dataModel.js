const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/test", {useNewUrlParser:true});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function(){
    // connected
    const assignmentSchema = new mongoose.Schema({
        assignmentData: '',               //key to database
        assignmentTitle: '',              //should this be a variable passed in
        assignmentType: '',               //should this be null
        dueDate: Date,                      //get from user input form
        frequency: '',                    //get from user input form
        patientName: '',                  //get from user input form
        done: false,                        //starts false as default
        specialInstructions: ''           //get from user input form
    });

    const Grounding = mongoose.model("Grounding", assignmentSchema)
    const flashback = new Grounding({
        assignmentData: "flashbackKey",
        assignmentTitle: "Flashback Grounding",     // this and the below would be passed in as a variable from form, except for "done"
        assignmentType: "Grounding",
        dueDate: new Date(),
        frequency: "Weekly",
        patientName: "Liam",
        done: false,
        specialInstructions: "Please let me know if you need any help!"
    });

    flashback.save(function (err, flashback) {
    });
    
});


