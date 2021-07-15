import React, { useContext, useState, useEffect, Component } from "react";
import { useDispatch, useSelector } from "react-redux" //
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
import { useHistory } from 'react-router' //
import { addExercise, editExercise } from '../redux/slices/assignmentSlice' //methods to add and edit exercises in the global store
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function ExerciseForm() {
    const dispatch = useDispatch();
    let history = useHistory()
  
    const [redirect, setRedirect] = useState(false)
    
    const [exerciseDueNextSession, setExerciseDueNextSession] = useState(false) 
    //local state to keep track of users choice to use/not use next session date

    const [setAssignment, setAssignmentState] = useState(useSelector((state) => state.assignment.currentAssignment))

    const exerciseList = setAssignment.exerciseList

    const [chosenExercise, setChosenExercise] = useState(setAssignment.chosenExercise) 
    //receive empty exercise template from assignment form if we are adding, or exercise to be edited if the edit icon was clicked (chosenExercise)
    //setChosenExercise used to update currently chosen exercise
    
    const [userDueByChoice, setUserDueByChoice] = useState('Choose Date') 
    //value used in daysWeeksCustomInput function, updated in updateChosenExerciseDueDate

    
    const [customExerciseFrequency, setCustomExerciseFrequency] = useState(chosenExercise.frequency != "Daily" && chosenExercise.frequency != "Weekly" && chosenExercise.frequency != "Bi-Weekly")
    // Indicates if therapist wants custom frequency on an exercise
    // If so, the condition will pass and the custom input field will show

    const [dateState, setDateState] = useState(new Date(chosenExercise.dueDate))

    
    var exercises = [];
    const exerciseTypes = { //dictionary of exercise types and their possible titles
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
        
    });    
    
    function getExercises(exercises) { //populates sidebar with already added exercises, and exercise chosen to edit for comparison purposes
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
        return result;
    }

    function getExerciseFormData(data){  //sets up choices for exercise type
        const result = Object.keys(data).map((d) =>
            <option>{d}</option>
        );      
        return result;
    }
    function getExerciseTitle(data, choice){  //sets up choices for exercise title based on type chosen previously
        if(data[choice] == undefined){
            return <option>undef</option>
        }
        const result = data[choice].map((d) =>
            <option>{d}</option>
        );
        return result;
    }

    const addNewExercise = (exercise) => {
        //fires when we're done editing or adding
        let exerciseToAdd = Object.assign({}, exercise)
        exerciseToAdd.goal = getGoal(exercise.dueDate, exercise.frequency) //set exercise's unique goal based on frequency of completion within the due date
        if (exerciseToAdd.editing) {
            dispatch(
                editExercise({ //reducer method from assignment slice
                    exercise: exerciseToAdd
                })
            )
        }
        else {
            exerciseToAdd.editing = true
            dispatch(
                addExercise({ //reducer method from assignment slice
                    exercise: exerciseToAdd
                })
            )   
        }
        history.push('/assignmentform')
    }

    const updateChosenExercise = (targetKey, newValue) => {
        //updates the chosenExercise locally based on whatever key value is passed in

        // If they're changing the due date, state can't be updated immediately if they select days, weeks, or customDate

        let newChosenExercise = {}
        for (let key in chosenExercise) { //copies the old chosenExercise key for key
            newChosenExercise[key] = chosenExercise[key]
        }

        newChosenExercise[targetKey] = newValue //updated based on the new key-value pair

        if (targetKey == "exerciseType") {
            newChosenExercise.exerciseTitle = exerciseTypes[newValue][0]
        }

        //Add necessary string corrections and change custom frequency state variable to reflect the choice
        //changing the state variable here allows the additional custom input field to show up later - showCustomFrequencyInput function
        if (targetKey == "frequency") {
            if (newValue == '[x] per week' || !isNaN(newValue)) {
                newChosenExercise.frequency = String(newValue) + ' per week'
                setCustomExerciseFrequency(true)
            }
            else {
                setCustomExerciseFrequency(false)
            }
        }

        setChosenExercise(newChosenExercise) //update chosenExercise state
    }

    const updateChosenExerciseDueDate = (dueDateSelection, newValue) => {
        //method to update the due date for a particular exercise
        //with options like Days, Weeks, and Choose Date (for each exercise), due date calculations can get complex
        //this method does those calculations to set the correct due date, and update the necessary local states
        setUserDueByChoice(dueDateSelection)
        let newDueDate
        let today = new Date()
        let millisecondsInADay = 1000 * 60 * 60 * 24
        if (dueDateSelection == "Next Session") {
            setExerciseDueNextSession(true)
            newDueDate = setAssignment.nextSession
            setUserDueByChoice(newDueDate)
            updateChosenExercise("dueDate", newDueDate)
        } else {
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
                updateChosenExercise("dueDate", newDueDate) //update chosenExercise state with new date information
            }
        }

    }

    const showCustomFrequencyInput = () => {
        if (customExerciseFrequency) { //checks state variable for if we are doing a custom frequency.  if not, custom input field does not show up
            return (
                <Form.Group controlId="customExerciseFrequency">
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
    
    function getGoal(dueDate,frequency){ //calcualtes goal for given exercise. the goal is the number of times an exercise should be completed, and depends on the frequency of completion within the due date
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
    }

    function daysWeeksCustomInput(){
        //method that displays the custom input selected based on the user choice stored in the userDueByChoice local state variable
        //updates the due date on form change.  updateChosenExerciseDueDate does some date calculations then calls updateChosenExercise
        //which in turn updates the local state for the chosenExercise. 
        if (!exerciseDueNextSession) {
            switch (userDueByChoice) {
                case "Days":
                    return (
                        <Form.Group controlId="daysOrWeeks">
                            <Form.Control onChange = {event => updateChosenExerciseDueDate("Days", event.target.value)} as = "textarea" placeholder={`Enter number of ${userDueByChoice}`}  rows = {1} />
                        </Form.Group>
                    )
                case "Weeks":
                    return (
                        <Form.Group controlId="daysOrWeeks">
                            <Form.Control onChange = {event => updateChosenExerciseDueDate("Weeks", event.target.value)} as = "textarea" placeholder={`Enter number of ${userDueByChoice}`}  rows = {1} />
                        </Form.Group>
                    )
                case "Choose Date":
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
                {getExercises(setAssignment.exerciseList)}
            </Col>
            <Col>
            <div className = "Exercise-form-container">
                <Form>
                    <Form.Group controlId="exerciseType">
                        <Form.Label>Exercise Type</Form.Label>
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
