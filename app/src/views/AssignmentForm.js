import React from "react";
import { Component } from "react";
import '../css/ExerciseForm.css';
import { MDBCard, MDBCardBody, MDBContainer,MDBCardTitle,MDBCardText } from "mdbreact";
import logo from '../Mira.jpg';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/AssignmentForm.css'
import { Plus } from 'react-bootstrap-icons';

class AssignmentForm extends Component {
  
    constructor(props) {
      super(props);
        this.assignment = 
        {
            dateAssigned: "1/1",
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
                        <MDBCard>
                            <MDBCardTitle className = "Card1-title">Assignment Information</MDBCardTitle>
                            <p>Date Assigned: {this.assignment.dateAssigned} Session Number: {this.assignment.visitNumber}</p>
                            <p>Therapist: {this.assignment.therapistName}</p>
                            <p>Client Name: {this.assignment.clientName}</p>
                            <h2>Exercises</h2>
                            <div className = "Exercise-card-container">
                                <ExerciseRow exercises={this.assignment.exercises} />
                            </div>
                            <Row>
                                <MDBCard>
                                    <Plus/>
                                </MDBCard>
                            </Row>
                            <MDBCardText>
                            </MDBCardText>
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
                                            <Button variant="primary" type="submit" >
                                                FINISH
                                            </Button>
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
            <MDBCard>
            <p className="exerciseCard">{exercise.name}</p>
            <p className="exerciseCard">{exercise.frequency}</p>
            <p className="exerciseCard">{exercise.due}</p>
            <p className="exerciseCard">{exercise.specialInstructions}</p>
            </MDBCard>
        </Row>
        );
        return result;
    }
    
    render() {
        return(this.getExercises(this.exercises))
    }
}

    export default AssignmentForm;