
import React, { useContext, useState, useEffect, Component } from "react";
import { useDispatch, useSelector } from "react-redux"
import '../css/ExerciseForm.css';
import { MDBCard, MDBCardTitle } from "mdbreact";
import logo from '../Mira.jpg';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link, Redirect} from 'react-router-dom';
import { getAssignments } from '../api/clientAPI'

function ExerciseForm() {
    const dispatch = useDispatch();
    /*
    this.state = {
        chosenExercise: {
            type: "",
            name: "",
            due: '',
            frequency: '',
            specialInstructions: ''
        },
        exerciseToEdit: props.location.data.editExercise,
        added: props.location.data.addedExercises,
        nextSession: props.location.data.nextSessionDate
    
    }*/
    const [redirect, setRedirect] = useState(false)
    const [setAssignment, setAssignmentState] = useState({
        //these below should be empty to start, but fill with something like the following:
                                /*{
                                    exerciseTitle: "",
                                    exerciseType: "",
                                    dueDate: new Date(),
                                    frequency: "",
                                    patientName: "",
                                    patientId: "",
                                    progress: 0,
                                    specialInstructions: "",
                                    goal: 0
                                }*/
        chosenExercise: {},
        exerciseToEdit: [],
        added: [],
        nextSession: new Date()//props.location.data.nextSessionDate  WHERE CAN I GET THIS FROM????
    })

    console.log(setAssignment.added);
    var exercises = [];
    const exerciseTypes = {
        "Grounding": ["Flashback Grounding", "Color Finder", "Breathing Exercise", "Vibration Tool", "Bilateral Simulation", "5, 4, 3, 2, 1 Grounding", "Any", "All"],
        "Reading": ["PTSD Content", "Trauma Story"],
        "Writing": ["Write About Trauma", "Free Writing"],
        "Worksheets": ["CPT Worksheet", "PTP Worksheet", "Upload Your Own"],
        "Assessments": ["PCL-5 Questionnaire", "PHQ-9 Questionnaire"],
        "Lists": ["Gratefullness List", "Self-Care", "Stuck Points", "Create Your Own List", "Track Symptoms", "Track Triggers"]      
    }
    const dueByChoices = ["Next Session", "Custom Days", "Custom Weeks", "Choose Date"];
    const frequenceyChoices = ["Daily", "Weekly", "Bi-Weekly", "Custom per Week"];
    if (setAssignment.added == [] || !setAssignment.added){
        exercises = [];
    } else {
        //hitting this case, shouldnt be because nothing was added yet
        exercises = setAssignment.added;
    }
    console.log(setAssignment.exerciseToEdit)
    if (setAssignment.exerciseToEdit == [] || setAssignment.exerciseToEdit == undefined){
        setAssignment.chosenExercise = {
            exerciseTitle: "Flashback Grounding",
            exerciseType: "Grounding",
            dueDate: "Next Session",
            frequency: "Daily",
            patientName: "",
            patientId: "",
            progress: 0,
            specialInstructions: "",
            goal: 0
        };
    } else {
        setAssignment.chosenExercise = {
            exerciseTitle: setAssignment.exerciseToEdit.exerciseTitle,
            exerciseType: setAssignment.exerciseToEdit.exerciseType,            
            dueDate: setAssignment.exerciseToEdit.dueDate,
            frequency: setAssignment.exerciseToEdit.frequency,
            patientName: setAssignment.exerciseToEdit.patientName,
            patientId: setAssignment.exerciseToEdit.patientId,
            progress: setAssignment.exerciseToEdit.progress,
            specialInstructions: setAssignment.exerciseToEdit.specialInstructions,
            goal: setAssignment.exerciseToEdit.goal
        }
    }
    console.log(setAssignment.chosenExercise)
    useEffect(async () => {
        console.log("aaaaa")
        /*var data = await getAssignments("PjohnDoe1");
        setAssignmentState({
            dateAssigned: today,
            visitNumber: data[data.length - 1].visitNumber + 1, //
            therapistName: data[data.length - 1].therapistName,
            patientId: data[data.length - 1].patientId,
            clientName: data[data.length - 1].patientName,
            due: new Date(),
            status: 0,
            nextSession: new Date(),
            exercises: [
                {
                    exerciseTitle: "",
                    exerciseType: "",
                    dueDate: new Date(),
                    frequency: "",
                    patientName: "",
                    patientId: "",
                    progress: 0,
                    specialInstructions: "",
                    goal: 0
                },
    
            ]
        });*/
    });    
    function bigFilter(exerciseList, exercise){
        //filters out chosen exercise to edit from list of exercises
        const converted = [];
        for (let i = 0; i < exerciseList.length; i++){
            if (exerciseList[i].exerciseType == exercise.exerciseType && exerciseList[i].exerciseTitle == exercise.exerciseTitle && exerciseList[i].dueDate == exercise.dueDate && exerciseList[i].frequency == exercise.frequency && exerciseList[i].specialInstructions == exercise.specialInstructions){
                exerciseList.splice(i, 1);
                i--;
                //delete exerciseList[i];
            }
        }
        for (let j = 0; j < exerciseList.length; j++){
            converted.push(Object.values(exerciseList[j]));
        }
        exerciseList = converted; 
        

        //delete exerciseList[exerc]
        //var filtered = exerciseList.filter(function(value, index, arr))
        console.log(exerciseList);
        console.log(setAssignment.added);
        console.log(exercise);
        return exerciseList;
    }
    
    function getExercises(exercises) {
        console.log(exercises);
        const result = exercises.map((exercise, idx) =>
        <Row key = {idx}>
            <div className = "Exercise-card-row" key = {idx}>
                <MDBCard className = "Exercise-card-body" key = {idx}>
                    <p className="exerciseTitle">{exercise[1]}</p>
                    <p className="exerciseCard">{exercise[5]}</p>
                    <p className="exerciseCard">Due By: {exercise[2]}</p>
                    <p className="exerciseCard">Special Instructions: {exercise[6]}</p >
                </MDBCard>
            </div>
        </Row>
        );
        console.log(result);
        return result;
    }
    //
    function getExerciseFormData(data){
        const result = Object.keys(data).map((d) =>
            <option>{d}</option>
        );      
        return result;
    }
    function getExerciseTitle(data, choice){
        if(data[choice] == undefined){
            return <option>balls</option>
        }
        const result = data[choice].map((d) =>
            <option>{d}</option>
        );
        return result;
    }
    
    function getGoal(dueDate,frequency){
        var today = new Date();
        const difference = Math.abs(dueDate - today);
        let dayDiff =  difference / (1000 * 60 * 60 * 24);
        dayDiff = Math.ceil(dayDiff);
        switch(frequency) {
            case "Daily":
                return dayDiff;
            case "Weekly":
              // code block
                return Math.floor(dayDiff/7);
            case "Bi-Weekly":
              // code block
                return Math.floor(dayDiff/3.5);
            default:
                return Math.floor(dayDiff/(7/frequency));
        } 
    }//

    function doRedirect(){
        if(redirect){
            <Redirect to='/AssignmentForm'/>
        } 
    }

return(
    <div>
    {/* <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta> */}
        <div className = "App-logo-container">
            <img src={logo} className="App-logo" alt="logo" />
        </div>
        <div className = "Exercise-form-title-container">
            <p className = "Exercise-form-title-text">Exercise Form</p>
        </div> 
        <Container fluid className = "background-container">
        <Row className = "background">
            <Col className = "Added-exercise-list">
                <Row className = "Added-exercise-list-text">Added Exercises:</Row>
                {getExercises(bigFilter(exercises, setAssignment.chosenExercise))/*cannot pass array/object as a react component, missing a step here*/}
            </Col>
            {/*<Col>
            <MDBCard className="Exercise-preview-body">
                <MDBCardTitle className="Exercise-preview-placeholder-text">-Exercise Preview-</MDBCardTitle>
            </MDBCard>          
            </Col>*/}
            <Col>
            <div className = "Exercise-form-container">
                <Form>

                {/* COMMENTED THESE OUT BECAUSE OF getExercises ERROR THAT NEEDS TO BE FIXED*/}
                <Form.Group controlId="exerciseType">
                    <Form.Label>Exercise Type</Form.Label>
                    <Form.Control  onChange = {event => setAssignmentState({chosenExercise: {exerciseType: event.target.value}})} as="select" defaultValue = {setAssignment.chosenExercise.exerciseType} custom>
                    {getExerciseFormData(exerciseTypes)}
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="exerciseTitle">
                    <Form.Label>Exercise Title</Form.Label>
                    <Form.Control onChange = {event => setAssignmentState({chosenExercise: {exerciseTitle: event.target.value}})} as="select" defaultValue = {setAssignment.chosenExercise.exerciseTitle} custom>
                    {getExerciseTitle(exerciseTypes, setAssignment.chosenExercise.exerciseType)}
                    </Form.Control>
                </Form.Group> 
                <Form.Group>
                    <Form.Label>Due By</Form.Label>
                    <Form.Control onChange = {event => setAssignmentState({chosenExercise: {dueDate: event.target.value}})} as="select" defaultValue = {"Next Session:" + toString(setAssignment.nextSession)} custom>
                    <option>{`Next Session: ${setAssignment.nextSession[0]}/${setAssignment.nextSession[1]}/${setAssignment.nextSession[2]}`}</option>
                    <option>Days</option>
                    <option>Weeks</option>
                    <option>Choose Date</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="frequency">
                    <Form.Label>Frequency</Form.Label>
                    <Form.Control onChange = {event => setAssignmentState({chosenExercise: {frequency: event.target.value}})} as="select" defaultValue = {setAssignment.chosenExercise.frequency} custom>
                    <option>Daily</option>
                    <option>Weekly</option>
                    <option>Bi-Weekly</option>
                    <option>[x] per week</option>
                    </Form.Control>
                </Form.Group>
                
                <Form.Group controlId="specialInstructions">
                    <Form.Label>Special Instructions</Form.Label>
                    <Form.Control onChange = {event => setAssignmentState({chosenExercise: {specialInstructions: event.target.value}})} as = "textarea" placeholder="Enter Special Instructions"  rows = {4} />
                </Form.Group>
                
                <Link to = {{
                    pathname: "/AssignmentForm",
                    data: {editedExerciseList: exercises,
                            nextSession: setAssignment.nextSession} 
                }}>
                    <Button onClick={() => setRedirect(true)} variant="primary" type="Submit">
                    Add
                    </Button>
                </Link>
                </Form>
            </div>
            </Col>
        </Row>
        </Container> 
    {doRedirect}
    
</div>
)
}
export default ExerciseForm;
