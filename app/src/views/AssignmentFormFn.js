import React, { useContext, useState, useEffect, Component } from "react";
import { useDispatch, useSelector } from "react-redux"; //
import '../css/ExerciseForm.css';  
import { MDBCard, MDBCardBody, MDBContainer,MDBCardTitle,MDBCardText } from "mdbreact";
import logo from '../mira-new-medium.png';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/AssignmentForm.css'
import EditIcon from '@material-ui/icons/Edit';
import { Link } from "react-router-dom";
import { postAssignment } from '../api/clientAPI'; //post method from clientAPI. Updates database
import { openAssignment, clearAssignment } from '../redux/slices/assignmentSlice'; //methods for updating the assignment store
import { addAssignmentToClient } from "../redux/slices/therapistSlice"; //method that pushes assignment data to therapist store on SUBMIT
import { useHistory } from 'react-router'; //


function AssignmentForm() {
    const dispatch = useDispatch();
    let history = useHistory();
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;

    const [{client}] = useState(
        useSelector((state) => state.client) //need correct id for updating store
      )

    const [{therapist}] = useState(
        useSelector((state) => state.therapist) //need correct id for updating store
      )

    let [assignments] = useState(useSelector((state) => state.therapist.therapist.clientInfo["PjohnDoe1"])) //gets the assignments of a client with id PjohnDoe1
   
    const [setAssignment, setAssignmentState] = useState(useSelector((state) => state.assignment.currentAssignment)) 
        //holds current assignment data in setAssignment
        //can change current assignment data by using setAssignmentState.  Takes an object of similar dimensions    
        //With this we can grab the part of the store we need. Updates automatically as the store is changed as well (does a comparison, if diff -> changes and re-renders components involved)

    const [dateState, setDateState] = useState({
        startDate: new Date(setAssignment.nextSession)
    })

    const defaultExercise = {
        exerciseTitle: "Flashback Grounding",
        exerciseType: "Grounding",
        dueDate: setAssignment.nextSession,
        frequency: "Daily",
        patientName: client.name,
        patientId: client.id,
        progress: 0,
        specialInstructions: "",
        goal: 0,
        id: setAssignment.exerciseList.length,
        // false means adding an exercise to the assignment, true means editing an existing one
        editing: false
    }

    useEffect(async () => {
        
    });

    const updateCurrentAssignment = () => { 
        //method is called when submitting form (assigning the assignment)
        //Set assignment visit number to reflect number of assignments
        let finalAssignment = Object.assign({}, setAssignment)
        finalAssignment.visitNumber = assignments.length + 1
        finalAssignment.patientId = client.id
        finalAssignment.therapistName = "Jane Doe"
        //assign assignment
        postAssignment(finalAssignment)

        dispatch(
            //update therapist information in global store
            addAssignmentToClient({
                assignment: finalAssignment
            })
        );

        dispatch(
            //place an empty assignment in the assignment store for the next new assignment
            clearAssignment()
        )
        //update assignment state with newly created assignment
        setAssignmentState(finalAssignment)
    }

                                    
    function getExercises(exercises, next) {
        //populates the page with exercise cards
        if (exercises.length != 0){   
            const result = exercises.map((exercise) =>
            <Row>
                <div className = "Exercise-card-row">
                    <MDBCard className = "Exercise-card-body">
                        <p className="exerciseTitle">{exercise.exerciseTitle} <EditIcon onClick={() => goToExerciseForm(exercise)} className = "Edit-icon"/></p>
                        <p className="exerciseCard">{exercise.frequency}</p>
                        <p className="exerciseCard">Due By: {formatDateToString(exercise.dueDate)}</p>
                        <p className="exerciseCard">Special Instructions: {exercise.specialInstructions}</p>
                    </MDBCard>
                </div>
            </Row>
            );
                            
            return result;
        }
                
    }

    const goToExerciseForm = (exercise) => {
        //fires when we want to go to the exercise form page
        let newAssignmentState = {};
        for (let key in setAssignment) {
            newAssignmentState[key] = setAssignment[key];
        }

        // If exercise title field is empty, this means we are adding (edit icon was not pressed). update assignment state to include empty exercise as chosen exercise
        if (!exercise.exerciseTitle) {
            newAssignmentState.chosenExercise = defaultExercise;
        } else {
            // Otherwise, update assignment state to include exercise to be edited
            newAssignmentState.chosenExercise = exercise;
        }
        setAssignmentState(() => newAssignmentState) // Update assignment state to include empty exercise to be added

        // Update assignment store with current assignment data
        dispatch(
            openAssignment({
                assignment: setAssignment,
                chosenExercise: newAssignmentState.chosenExercise
            })
        )

        history.push("/ExerciseForm")
    }

    const formatDateToString = (dateString) => {
        let date = new Date(dateString)
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
    }
        
    return(
    <div>
        <div className = "App-logo-container">
            <img src={logo} className="App-logo" alt="logo" />
        </div>
        <div className = "Client-view-title-container">
            <p className = "Client-view-title-text">Assignment Form</p> 
        </div>
        <Container fluid className = "Assignment-information-background-container">
            <Row className = "Assignment-information-background">
            <div className = "Assignment-information-container">
                <Col>
                <MDBContainer className = "Assignment-information-card">
                    <MDBCard className = "Assignment-information-body">
                        <p className = "Assignment-information-top">Date Created: {formatDateToString(setAssignment.dateAssigned)} Visit Number: {assignments.length + 1}</p>
                        <p className = "Assignment-information-top">Next Session: 
                                <div>
                                    <DatePicker
                                        selected={dateState.startDate}
                                        onSelect={selected => {
                                            setDateState({startDate: new Date(selected.getFullYear(), selected.getMonth(), selected.getDate())})
                                            let newAssignmentState = Object.assign({}, setAssignment)
                                            newAssignmentState.nextSession = selected
                                            setAssignmentState(newAssignmentState) //adjusts the assignment state based on date selection
                                        }}
                                        
                                        name="startDate"
                                    />
                                </div>
                        </p>
                        <p className = "Assignment-information-top">Therapist: {"Miranda Cosgrove"}</p>
                        <p className = "Assignment-information-top">Client Name: {client.name}</p>
                        <h2>Exercises</h2>
                        <div className = "Exercise-card-container">
                        {getExercises(setAssignment.exerciseList, dateState.startDate)}
                            <Row>
                                <MDBCard className = "Add-exercise">
                                    <Button variant="link" size="lg" onClick = { () => goToExerciseForm({}) }>
                                        Add Exercise
                                    </Button>
                                </MDBCard>
                            </Row>
                        </div>
                    </MDBCard>          
                </MDBContainer>
                </Col>
            </div>
            <div className = "Overall-instructions-container">
                <Col>
                    <MDBContainer className = "Overall-instructions-card">
                        <MDBCard className = "Overall-instructions-body">
                            <MDBCardTitle className = "Overall-instructions-title">Overall Instructions</MDBCardTitle>
                                <Form>
                                    <Form.Group controlId="exerciseTitle">
                                        <Form.Control placeholder="" />
                                    </Form.Group>
                                    <div className = "Assignment-form-finish-button">
                                        <Link to = "/ClientView">
                                            <Button onClick = {updateCurrentAssignment}variant="primary" type="submit" >
                                                Assign
                                            </Button>
                                        </Link>
                                    </div>
                                </Form>
                        </MDBCard>          
                    </MDBContainer>
                </Col>
            </div>
            </Row>
        </Container> 
    </div>
    )

}

export default AssignmentForm;
