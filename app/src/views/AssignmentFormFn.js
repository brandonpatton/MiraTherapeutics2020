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



/*function SetUpNextSession(){
    const [startDate, setStartDate] = useState(new Date());
}*/
function AssignmentForm() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;

    const [dateState, setDateState] = useState({
        startDate: new Date()
    })

    const [setAssignment, setAssignmentState] = useState({
        dateAssigned: today,
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
            
        ]
    })
    

    
    
    /*const assignment = //should be updated based on store somehow (once the user comes back from editing/adding an exercise)
    {
        dateAssigned: today,
        visitNumber: 0,
        therapistName: "",
        clientName: "",
        due: '',
        status: '',
        nextSession: "",
        exercises: [
            {
                type: "",
                name: "",
                due: '',
                completionStatus: "",
                completionAmount: 0,
                frequency: "",
                specialInstructions: ""
            },
            
        ]
    }*/

async function getAssignments(patientID){
    let assignments = await fetch(`http://localhost:3080/assignments/patient/${patientID}`)
    assignments = await assignments.json()
    assignments.sort((a, b) => a.visitNumber - b.visitNumber)
    return assignments;
}

    useEffect(async () => {
        var data = await getAssignments('PjohnDoe1');
        // update the state with the assignments in the right order
        // make the assignment that's visible to the therapist the most recent one
        //this.setState((state) => ({selectedAssignment: state.patient.assignments[state.patient.assignments.length - 1]}))
        //setSelectedAssignment(data[data.length - 1])
        setAssignmentState({
            dateAssigned: today,
            visitNumber: data[data.length].visitNumber + 1,
            therapistName: data[data.length].therapistName,
            patientId: data[data.length].patientId,
            clientName: data[data.length].clientName,
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
        });
        
    });
function getExercises(exercises, next) {
    
    const result = exercises.map((exercise) =>
    <Row>
        <div className = "Exercise-card-row">
            <MDBCard className = "Exercise-card-body">
                <p className="exerciseTitle">{exercise.name} <Link to = {{
                    pathname: "/ExerciseForm",
                    data: {editExercise: exercise,
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



    
return(
<div>
    <div className = "App-logo-container">
        <img src={logo} className="App-logo" alt="logo" />
    </div>
    <div className = "Client-view-title-container">
        <p className = "Client-view-title-text">Assignment Form</p> {/*Get this from previous page*/}
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
                                    
                                    //onChange={selected => this.setState({startDate: selected})}
                                    name="startDate"
                                />
                                {console.log(dateState.startDate)}
                            </div>
                        
                    </p>
                    <p className = "Assignment-information-top">Therapist: {setAssignment.therapistName}</p>
                    <p className = "Assignment-information-top">Client Name: {setAssignment.clientName}</p>
                    <h2>Exercises</h2>
                    <div className = "Exercise-card-container">
                    {console.log(dateState.startDate)}
                    {getExercises(setAssignment.exercises, dateState.startDate)}
                        <Row>
                            <MDBCard className = "Add-exercise">
                                
                                <Link to = {{ 
                                    pathname: "/ExerciseForm",
                                    data: {addedExercises: setAssignment.exercises,
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
                                        <Button variant="primary" type="submit" >
                                            Assign {/*Need to make sure this button submits for all the user-inputted data on screen (next session for ex) */}
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