
// FIX CUSTOM FREQUENCY FORM ISSUE
// SHOULD MAKE NEW INPUT TO SPECIFY HOW MANY TIMES PER WEEK

import React, { useContext, useState, useEffect, Component } from "react";
import { useDispatch, useSelector } from "react-redux"
import '../css/ExerciseForm.css';
import { MDBCard, MDBCardTitle } from "mdbreact";
import logo from '../mira-new-medium.png';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link, Redirect} from 'react-router-dom';
import { useHistory } from 'react-router'
import { getAssignments } from '../api/clientAPI'
import { addExercise, editExercise } from '../redux/slices/assignmentSlice'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function ExerciseForm() {
    const dispatch = useDispatch();
    let history = useHistory()
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
    
    const [exerciseDueNextSession, setExerciseDueNextSession] = useState(false)

    
    /*
    const [setAssignment, setAssignmentState] = useState({
        //these below should be empty to start, but fill with something like the following:
                              /*  {
                                    exerciseTitle: "",
                                    exerciseType: "",
                                    dueDate: new Date(),
                                    frequency: "",
                                    patientName: "",
                                    patientId: "",
                                    progress: 0,
                                    specialInstructions: "",
                                    goal: 0
                                }
        chosenExercise: {},
        exerciseToEdit: [],
        added: [],
        nextSession: new Date()//props.location.data.nextSessionDate  WHERE CAN I GET THIS FROM????
    })
    */

    const [setAssignment, setAssignmentState] = useState(useSelector((state) => state.assignment.currentAssignment))

    const exerciseList = setAssignment.exerciseList

    const [chosenExercise, setChosenExercise] = useState(setAssignment.chosenExercise)
    
    const [userDueByChoice, setUserDueByChoice] = useState('Choose Date')

    // Indicates if therapist wants custom frequency on an exercise
    // If so, extra input field is shown to let them enter frequecny per week
    const [customExerciseFrequency, setCustomExerciseFrequency] = useState(chosenExercise.frequency != "Daily" && chosenExercise.frequency != "Weekly" && chosenExercise.frequency != "Bi-Weekly")

    const [dateState, setDateState] = useState(new Date(chosenExercise.dueDate))

    
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
        exercises = setAssignment.added;
    }
    
    useEffect(async () => {
        console.log("aaaaa")
        
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
        return exerciseList;
    }
    
    function getExercises(exercises) {
        console.log(exercises);
        const result = exercises.map((exercise, idx) =>
        <Row key = {idx}>
            <div className = "Exercise-card-row" key = {idx}>
                <MDBCard className = "Exercise-card-body" key = {idx}>
                    <p className="exerciseTitle">{exercise.exerciseTitle}</p>
                    <p className="exerciseCard">{exercise[5]}</p>
                    <p className="exerciseCard">Due By: {formatDateToString(exercise.dueDate)}</p>
                    <p className="exerciseCard">Special Instructions: {exercise.specialInstructions}</p >
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
            return <option>undef</option>
        }
        const result = data[choice].map((d) =>
            <option>{d}</option>
        );
        return result;
    }

    const addNewExercise = (exercise) => {
        let exerciseToAdd = Object.assign({}, exercise)
        exerciseToAdd.goal = getGoal(exercise.dueDate, exercise.frequency)
        if (exerciseToAdd.editing) {
            dispatch(
                editExercise({
                    exercise: exerciseToAdd
                })
            )
        }
        else {
            exerciseToAdd.editing = true
            dispatch(
                addExercise({
                    exercise: exerciseToAdd
                })
            )   
        }
        history.push('/assignmentform')
    }

    const updateChosenExercise = (targetKey, newValue) => {
        // If they're changing the due date, state can't be updated immediately if they select days, weeks, or customDate

        let newChosenExercise = {}
        for (let key in chosenExercise) {
            newChosenExercise[key] = chosenExercise[key]
        }

        newChosenExercise[targetKey] = newValue

        if (targetKey == "exerciseType") {
            newChosenExercise.exerciseTitle = exerciseTypes[newValue][0]
        }

        // If they are choosing a custom frequency, add ' per week' so frequency doesn't just show a number
        // Otherwise, change customExerciseFrequency variable so the extra input goes away
        if (targetKey == "frequency") {
            if (newValue == '[x] per week' || !isNaN(newValue)) {
                newChosenExercise.frequency = String(newValue) + ' per week'
                setCustomExerciseFrequency(true)
            }
            else {
                setCustomExerciseFrequency(false)
            }
        }

        setChosenExercise(newChosenExercise)


        
    }

    const updateChosenExerciseDueDate = (dueDateSelection, newValue) => {
        setUserDueByChoice(dueDateSelection)
        let newDueDate
        let today = new Date()
        let millisecondsInADay = 1000 * 60 * 60 * 24
        if (dueDateSelection == "Next Session") {
            setExerciseDueNextSession(true)
            newDueDate = setAssignment.nextSession
            setUserDueByChoice(newDueDate)
            updateChosenExercise("dueDate", newDueDate)
        }
        else {
            setExerciseDueNextSession(false)
            if (newValue) {
                switch (dueDateSelection) {
                    case "Days":
                        setUserDueByChoice("Days")
                        newDueDate = new Date(today.getTime() + (millisecondsInADay * newValue))
                        break
                    case "Weeks":
                        setUserDueByChoice("Weeks")
                        newDueDate = new Date(today.getTime() + (millisecondsInADay * newValue * 7))
                        break
                    case "Choose Date":
                        setUserDueByChoice("Choose Date")
                        newDueDate = newValue
                        break
                }
                updateChosenExercise("dueDate", newDueDate)
            }
        }

    }

    const showCustomFrequencyInput = () => {
        if (customExerciseFrequency) {
            return (
                <Form.Group controlId="customExerciseFrequency">
                    {/* If a custom frequency has been entered, fill in the input with that value. Otherwise, tell them to enter a value */}
                    <Form.Control onChange = {event => updateChosenExercise("frequency", event.target.value)} 
                        as = "textarea" defaultValue={chosenExercise.frequency.split(' ').includes('[x]') ? "" : chosenExercise.frequency.split(' ')[0]} placeholder={`Enter frequency`}  rows = {1} 
                    />
                </Form.Group>
            )
        }
    }

    const formatDateToString = (dateString) => {
        let date = new Date(dateString)
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
    }
    
    function getGoal(dueDate,frequency){
        var today = new Date();
        const difference = Math.abs(dueDate - today);
        let dayDiff =  difference / (1000 * 60 * 60 * 24);
        dayDiff = Math.ceil(dayDiff);
        switch(frequency) {
            // Take the max of the expected goal and 1 to prevent the goal being 0
            case "Daily":
                return Math.max(1, dayDiff);
            case "Weekly":
              // code block
                return Math.max(1, Math.floor(dayDiff/7));
            case "Bi-Weekly":
              // code block
                return Math.max(1, Math.floor(dayDiff/3.5));
            default:
                let customFrequency = frequency.split(' ')[0]
                return Math.max(1, Math.floor(dayDiff/(7/customFrequency)));
        } 
    }//

    function daysWeeksCustomInput(){
        if (!exerciseDueNextSession) {
            console.log("hitting chosedaysorweeks")
            switch (userDueByChoice) {
                case "Days":
                    console.log("Days")
                    return (
                        <Form.Group controlId="daysOrWeeks">
                            <Form.Control onChange = {event => updateChosenExerciseDueDate("Days", event.target.value)} as = "textarea" placeholder={`Enter number of ${userDueByChoice}`}  rows = {1} />
                        </Form.Group>
                    )
                case "Weeks":
                    console.log("Weeks")
                    return (
                        <Form.Group controlId="daysOrWeeks">
                            <Form.Control onChange = {event => updateChosenExerciseDueDate("Weeks", event.target.value)} as = "textarea" placeholder={`Enter number of ${userDueByChoice}`}  rows = {1} />
                        </Form.Group>
                    )
                case "Choose Date":
                    console.log("Custom")
                    return (
                        <Form.Group controlId="daysOrWeeks">
                            <DatePicker
                                    selected= {dateState}
                                    onSelect={selected => {
                                        setDateState(new Date(selected.getFullYear(), selected.getMonth(), selected.getDate()))
                                        updateChosenExerciseDueDate("Choose Date", selected)
                                    }}
                                    
                                    name="startDate"
                                />
                        </Form.Group>
                    )
            }
            
        }
    }

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
                {getExercises(setAssignment.exerciseList)/*cannot pass array/object as a react component, missing a step here*/}
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
                    {/* updateChosen */}
                    <Form.Control  onChange = {event => updateChosenExercise("exerciseType", event.target.value)} as="select" defaultValue = {chosenExercise.exerciseType} custom>
                    {getExerciseFormData(exerciseTypes)}
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="exerciseTitle">
                    <Form.Label>Exercise Title</Form.Label>
                    <Form.Control  onChange = {event => updateChosenExercise("exerciseTitle", event.target.value)} as="select" defaultValue = {chosenExercise.exerciseTitle} custom>
                    {getExerciseTitle(exerciseTypes, chosenExercise.exerciseType)}
                    </Form.Control>
                </Form.Group> 
                <Form.Group controlId="dueBy">
                    <Form.Label>Due By</Form.Label>
                    <Form.Control  onChange = {event => updateChosenExerciseDueDate(event.target.value)} as="select" defaultValue = {"Choose Date"} custom>
                    <option>Next Session</option>
                    <option>Days</option>
                    <option>Weeks</option>
                    <option>Choose Date</option>
                    </Form.Control>
                </Form.Group>
                {daysWeeksCustomInput()}
                <Form.Group controlId="frequency">
                    <Form.Label>Frequency</Form.Label>
                    <Form.Control onChange = {event => updateChosenExercise("frequency", event.target.value)} as="select" defaultValue = {customExerciseFrequency ? '[x] per week' : 'Daily'} custom>
                    <option>Daily</option>
                    <option>Weekly</option>
                    <option>Bi-Weekly</option>
                    <option>[x] per week</option>
                    </Form.Control>
                </Form.Group>
                {showCustomFrequencyInput()}
                <Form.Group controlId="specialInstructions">
                    <Form.Label>Special Instructions</Form.Label>
                    <Form.Control onChange = {event => updateChosenExercise("specialInstructions", event.target.value)} as = "textarea" defaultValue = {chosenExercise.specialInstructions.length == 0 ? "" : chosenExercise.specialInstructions} placeholder = {"Enter special instructions"} rows = {1} />
                </Form.Group>
                
                <Link to = {{
                    pathname: "/AssignmentForm",
                    data: {editedExerciseList: exercises,
                            nextSession: setAssignment.nextSession} 
                }}>
                    {/* Add exercise to assignment here */}
                    <Button onClick={() => addNewExercise(chosenExercise)} variant="primary" type="Submit">
                    {chosenExercise.editing ? "Update" : "Add"}
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
