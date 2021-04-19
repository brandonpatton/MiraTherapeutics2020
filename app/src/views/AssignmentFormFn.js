import React, { useContext, useState, useEffect, Component } from "react";
import { useDispatch, useSelector } from "react-redux"
import { FormControl } from '@material-ui/core';
import '../css/ExerciseForm.css'; //tf 
import { MDBCard, MDBCardBody, MDBContainer,MDBCardTitle,MDBCardText } from "mdbreact";
import logo from '../Mira.jpg';
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
import { postAssignment } from '../api/clientAPI';
import { openAssignment } from '../redux/slices/assignmentSlice'; //method that pushes assignment data to store for exercise form to access
import { openClient } from "../redux/slices/clientSlice";
import { addAssignmentToClient } from "../redux/slices/therapistSlice"; //method that pushes assignment data to store on SUBMIT


function AssignmentForm() {
    const dispatch = useDispatch();
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;

    const [client] = useState(
        useSelector((state) => state.client) //need correct id for updating store
      )

    const [dateState, setDateState] = useState({
        startDate: new Date()
    })

    let stateCheck = useSelector((state) => console.log(state))

    const {therapist} = useSelector((state) => state.therapist)

    let [assignments] = useState(therapist.clientInfo['PjohnDoe1'])
    assignments.sort((a, b) => a.visitNumber - b.visitNumber)

    console.log(assignments)

    const [setAssignment, setAssignmentState] = useState({
        dateAssigned: today,
        visitNumber: assignments[assignments.length - 1].visitNumber + 1, //
        therapistName: assignments[assignments.length - 1].therapistName,
        patientId: assignments[assignments.length - 1].patientId,
        clientName: assignments[assignments.length - 1].patientName,
        due: new Date(),
        status: 0,
        nextSession: new Date(),
        exerciseList: [
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
        /*dateAssigned: today,
        visitNumber: 0,
        therapistName: "",
        patientId: "",
        clientName: "",
        due: '',
        status: '',
        nextSession: "",
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
            
        ]*/
    })    

    useEffect(async () => {
        
    });
//console.log(setAssignment);

const updateCurrentAssignment = () => {
    //assign assignment, called when submitting form

    postAssignment(setAssignment)

    dispatch(
        addAssignmentToClient({
            assignment: setAssignment
        })
    );
}

const postAssignmentToClient = () => {
    /*dispatch(
        openClient({

        })
    )*/
}

function getExercises(exercises, next) {
    //populates the page with exercise cards
    if (exercises[0].exerciseTitle != ""){   
        const result = exercises.map((exercise) =>
        <Row>
            <div className = "Exercise-card-row">
                <MDBCard className = "Exercise-card-body">
                    <p className="exerciseTitle">{exercise.name} <Link to = {{ //need an onclick function that sets this exercise as the one to be edited.
                        pathname: "/ExerciseForm",
                        data: {editExercise: exercise, // EDITING
                                addedExercises: exercises,
                                nextSessionDate: [String(next.getMonth() + 1), String(next.getDate()), String(next.getFullYear())]}}}><EditIcon className = "Edit-icon"/></Link></p>
                    <p className="exerciseCard">{exercise.frequency}</p>
                    <p className="exerciseCard">Due By: {exercise.due}</p>
                    <p className="exerciseCard">Special Instructions: {exercise.specialInstructions}</p>
                </MDBCard>
            </div>
        </Row>
        );
                        
        return result;
    }
            
}

async function assignAssignment() { 
    //update the store with the new assignment
    const postSettings = {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(setAssignment),
    }
    let toUpdate = await fetch(`http://localhost:3080/assignments/${client.id}`, postSettings);
    toUpdate = toUpdate.json();
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
                    <p className = "Assignment-information-top">Date Created: {setAssignment.dateAssigned} Visit Number: {setAssignment.visitNumber}</p>
                    <p className = "Assignment-information-top">Next Session: 
                            <div>
                                <DatePicker
                                    selected={dateState.startDate}
                                    onSelect={selected => setDateState({startDate: new Date(selected.getFullYear(), selected.getMonth(), selected.getDate())})}
                                    
                                    name="startDate"
                                />
                                {/*console.log(dateState.startDate)*/}
                            </div>
                    </p>
                    <p className = "Assignment-information-top">Therapist: {setAssignment.therapistName}</p>
                    <p className = "Assignment-information-top">Client Name: {setAssignment.clientName}</p>
                    <h2>Exercises</h2>
                    <div className = "Exercise-card-container">
                    {/*console.log(dateState.startDate)*/}
                    {getExercises(setAssignment.exerciseList, dateState.startDate)}
                        <Row>
                            <MDBCard className = "Add-exercise">
                                
                                <Link to = {{ 
                                    pathname: "/ExerciseForm",
                                    data: {addedExercises: setAssignment.exerciseList,
                                            nextSessionDate: [String(dateState.startDate.getMonth() + 1), String(dateState.startDate.getDate()), String(dateState.startDate.getFullYear())] }
                                    }}>
                                    <Button variant="link" size="lg">
                                        Add Exercise
                                    </Button>
                                </Link>
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