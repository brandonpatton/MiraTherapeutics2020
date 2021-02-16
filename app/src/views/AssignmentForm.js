import React from "react";
import { Component, useState } from "react";
import '../css/ExerciseForm.css';
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

function SetUpNextSession(){
    const [startDate, setStartDate] = useState(new Date());
}

class AssignmentForm extends Component {
    
  
    constructor(props) {
        super(props);
        
        this.state = {
            startDate: new Date()
          };
        this.handleChange = this.handleChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;
        this.assignment = 
        {
            dateAssigned: today,
            visitNumber: 3,
            therapistName: "Miranda Cosgrove",
            clientName: "Eduardo Bonelli",
            due: '11/17',
            status: 'Ongoing',
            exercises: [
                {
                    name: "Breathing Exercises",
                    due: '11/12',
                    completionStatus: "danger",
                    completionAmount: 75,
                    frequency: 'Daily',
                    specialInstructions: 'Yes'
                },
                {
                    name: "PCL-5 Assessments",
                    due: '11/15',
                    completionStatus: "success",
                    completionAmount: 100,
                    frequency: 'Daily',
                    specialInstructions: 'Yes'
                },
                {
                    name: "Readings",
                    due: '11/17',
                    completionAmount: "info",
                    completionAmount: 50,
                    frequency: 'Daily',
                    specialInstructions: 'Yes'
                    
                }
            ]
        }
    }
    handleChange(date) {
        this.setState({
            startDate: date
        })
    }
    onFormSubmit(e) {
        e.preventDefault();
    }
     
    render(){
        
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
                            <p className = "Assignment-information-top">Date Created: {this.assignment.dateAssigned} Visit Number: {this.assignment.visitNumber}</p>
                            <p className = "Assignment-information-top">Next Session: 
                                <form onSubmit={ this.onFormSubmit }>
                                    <div>
                                        <DatePicker
                                            selected={ this.state.startDate }
                                            onChange={ this.handleChange }
                                            name="startDate"
                                            dateFormat="MM/dd/yyyy"
                                        />
                                    </div>
                                </form>
                            </p>
                            <p className = "Assignment-information-top">Therapist: {this.assignment.therapistName}</p>
                            <p className = "Assignment-information-top">Client Name: {this.assignment.clientName}</p>
                            <h2>Exercises</h2>
                            <div className = "Exercise-card-container">
                                <ExerciseRow exercises={this.assignment.exercises} />
                                <Row>
                                    <MDBCard className = "Add-exercise">
                                        <Link to = "/ExerciseForm">
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
  }

  class ExerciseRow extends Component {
    constructor(props) {
      super(props);
      this.exercises = props.exercises;
    }
    getExercises(exercises) {
        const result = exercises.map((exercise) =>
        <Row>
            <div className = "Exercise-card-row">
                <MDBCard className = "Exercise-card-body">
                        <p className="exerciseTitle">{exercise.name} <EditIcon className = "Edit-icon"/></p>
                        <p className="exerciseCard">{exercise.frequency}</p>
                        <p className="exerciseCard">Due By: {exercise.due}</p>
                        <p className="exerciseCard">Special Instructions: {exercise.specialInstructions}</p>
                </MDBCard>
            </div>
        </Row>
        );
        return result;
    }
    
    render() {
        return(this.getExercises(this.exercises))
    }
}
  /*class NextSession extends Component {
    
    constructor(props) {
        super(props);
        
    }
    setNextSession() {
        
        <div>
            <p>Next Visit:</p>
            <DatePicker 
            value = {value}
            onSelect = {this.handleDate}
            onChange = {date => setStartDate(date)}
            />
        </div>
        
    }
    }*/

    export default AssignmentForm;