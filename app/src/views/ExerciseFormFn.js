
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


function ExerciseForm() {
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
    const [exerciseState, setExerciseState] = useState({
        chosenExercise: {
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
        exerciseToEdit: [],/*{//props.location.data.editExercise,
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
        added: [{//props.location.data.addedExercises,
            exerciseTitle: "",
            exerciseType: "",
            dueDate: new Date(),
            frequency: "",
            patientName: "",
            patientId: "",
            progress: 0,
            specialInstructions: "",
            goal: 0
        }],
        nextSession: new Date()//props.location.data.nextSessionDate
    })

    /*const [assignments, setAssignments] = useState([{
        due: '',
        status: 0,
        exercises: []
    }])

    const [selectedExercise, setSelectedExercise] = useState({
        //they pick the date on this page, 
        //would this then set the default or update the state with the chosen date?
        //*can i get the date you generate from the previous page? because all the local
        //*state is is startDate which begins as a new Date() object and is updated with the chosen date.
        due: new Date()
    })

    const [selectedEditedExercise, setSelectedEditedExercise] = useState({
        //when they press the edit button, 
        //it should send the exercise info here to be sent to the store
        //so that the exerciseform can access it from the store and perform editing
        //Does this selectedxyz thing in the state just select the object FOR editing or does it update it too?
    })*/
    console.log(exerciseState.added);
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
    if (exerciseState.added == [] || !exerciseState.added){
        exercises = [];
    } else {
        exercises = exerciseState.added;
    }
    console.log(exerciseState.exerciseToEdit)
    if (exerciseState.exerciseToEdit == [] || exerciseState.exerciseToEdit == undefined){
        exerciseState.chosenExercise = {
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
        exerciseState.chosenExercise = {
            exerciseTitle: exerciseState.exerciseToEdit.exerciseTitle,
            exerciseType: exerciseState.exerciseToEdit.exerciseType,            
            dueDate: exerciseState.exerciseToEdit.dueDate,
            frequency: exerciseState.exerciseToEdit.frequency,
            patientName: exerciseState.exerciseToEdit.patientName,
            patientId: exerciseState.exerciseToEdit.patientId,
            progress: exerciseState.exerciseToEdit.progress,
            specialInstructions: exerciseState.exerciseToEdit.specialInstructions,
            goal: exerciseState.exerciseToEdit.goal
        }
    }
    console.log(exerciseState.chosenExercise)
    useEffect(() => {
        fetch("http://localhost:3080/assignments/patient/PjohnDoe1")
            .then(res => res.json())
            .then(data => {
            // sort the assignments based on the number of the visit during which they were assigned
            data.sort((a, b) => a.visitNumber - b.visitNumber)
            // add an extra assignment to allow for a new one to be created
            // update the state with the assignments in the right order
            /*setExerciseState({
                chosenExercise: {
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
                exerciseToEdit: {//props.location.data.editExercise,
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
                added: [{//props.location.data.addedExercises,
                    exerciseTitle: "",
                    exerciseType: "",
                    dueDate: new Date(),
                    frequency: "",
                    patientName: "",
                    patientId: "",
                    progress: 0,
                    specialInstructions: "",
                    goal: 0
                }],
                nextSession: new Date()

            })*/
            // make the assignment that's visible to the therapist the most recent one
            //this.setState((state) => ({selectedAssignment: state.patient.assignments[state.patient.assignments.length - 1]}))
            //setSelectedAssignment(data[data.length - 1])
        });
    });    
    function bigFilter(exerciseList, exercise){
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
        console.log(exerciseState.added);
        console.log(exercise);
        return exerciseList;
    }
    function getExercises(exercises) {
        const result = exercises.map((exercise) =>
        <Row>
            <div className = "Exercise-card-row">
                <MDBCard className = "Exercise-card-body">
                    <p className="exerciseTitle">{exercise[1]}</p>
                    <p className="exerciseCard">{exercise[5]}</p>
                    <p className="exerciseCard">Due By: {exercise[2]}</p>
                    <p className="exerciseCard">Special Instructions: {exercise[6]}</p >
                </MDBCard>
            </div>
        </Row>
        );
        return result;
    }
    function getExerciseFormData(data){
        const result = Object.keys(data).map((d) =>
            <option>{d}</option>
        );      
        return result;
    }
    function getExerciseTitle(data, choice){
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
    }
    function setRedirect(){
        this.setState({
            redirect: true
        });
    }
    function doRedirect(){
        if(this.state.redirect){
            return <Redirect to='/AssignmentForm'/>
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
                {getExercises(bigFilter(exercises, exerciseState.chosenExercise))}
            </Col>
            {/*<Col>
            <MDBCard className="Exercise-preview-body">
                <MDBCardTitle className="Exercise-preview-placeholder-text">-Exercise Preview-</MDBCardTitle>
            </MDBCard>          
            </Col>*/}
            <Col>
            <div className = "Exercise-form-container">
                <Form>
                <Form.Group controlId="exerciseType">
                    <Form.Label>Exercise Type</Form.Label>
                    <Form.Control  onChange = {event => setExerciseState({chosenExercise: {exerciseType: event.target.value}})} as="select" defaultValue = {exerciseState.chosenExercise.exerciseType} custom>
                    {getExerciseFormData(exerciseTypes)}
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="exerciseTitle">
                    <Form.Label>Exercise Title</Form.Label>
                    <Form.Control onChange = {event => setExerciseState({chosenExercise: {exerciseTitle: event.target.value}})} as="select" defaultValue = {exerciseState.chosenExercise.exerciseTitle} custom>
                    {getExerciseTitle(exerciseTypes, exerciseState.chosenExercise.exerciseType)}
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Due By</Form.Label>
                    <Form.Control onChange = {event => setExerciseState({chosenExercise: {dueDate: event.target.value}})} as="select" defaultValue = {"Next Session:" + toString(exerciseState.nextSession)} custom>
                    <option>{`Next Session: ${exerciseState.nextSession[0]}/${exerciseState.nextSession[1]}/${exerciseState.nextSession[2]}`}</option>
                    <option>Days</option>
                    <option>Weeks</option>
                    <option>Choose Date</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="frequency">
                    <Form.Label>Frequency</Form.Label>
                    <Form.Control onChange = {event => setExerciseState({chosenExercise: {frequency: event.target.value}})} as="select" defaultValue = {exerciseState.chosenExercise.frequency} custom>
                    <option>Daily</option>
                    <option>Weekly</option>
                    <option>Bi-Weekly</option>
                    <option>[x] per week</option>
                    </Form.Control>
                </Form.Group>
                
                <Form.Group controlId="specialInstructions">
                    <Form.Label>Special Instructions</Form.Label>
                    <Form.Control onChange = {event => setExerciseState({chosenExercise: {specialInstructions: event.target.value}})} as = "textarea" placeholder="Enter Special Instructions"  rows = {4} />
                </Form.Group>
                <Link to = {{
                    pathname: "/AssignmentForm",
                    data: {editedExerciseList: exercises,
                            nextSession: exerciseState.nextSession} 
                }}>
                    <Button onClick={setRedirect()} variant="primary" type="Submit">
                    
                    Add
                    </Button>
                </Link>
                </Form>
            </div>
            </Col>
        </Row>
        </Container> 
    {doRedirect()}
</div>
)
}
export default ExerciseForm;
