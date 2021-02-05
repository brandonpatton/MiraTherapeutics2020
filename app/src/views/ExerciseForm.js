import React from "react";
import { Component } from "react";
import '../css/ExerciseForm.css';
import { MDBCard, MDBCardTitle } from "mdbreact";
import logo from '../Mira.jpg';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";




class ExerciseForm extends Component {
    constructor(props) {
      super(props);
      this.exercises = [
        {
          name: 'Flashback Grounding',
          frequency: 'Daily',
          due: '1 week',
          specialInstructions: 'Yes'
        }
      ]
    }

    render(){
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
                  
                  <ExerciseRow exercises={this.exercises} />
                </Col>
                <Col>
                  <MDBCard className="Exercise-preview-body">
                    <MDBCardTitle className="Exercise-preview-placeholder-text">-Exercise Preview-</MDBCardTitle>
                  </MDBCard>          
                </Col>
                <Col>
                  <Form>
                    <Form.Group controlId="exerciseType">
                      <Form.Label>Exercise Type</Form.Label>
                      <Form.Control as="select" custom>
                        <option>Grounding</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="exerciseTitle">
                      <Form.Control placeholder="Exercise Title" />
                    </Form.Group>
                    <Form.Group controlId="frequency">
                      <Form.Label>Frequency</Form.Label>
                      <Form.Control as="select" custom>
                        <option>Daily</option>
                        <option>Weekly</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="specialInstructions">
                      <Form.Control placeholder="Special Instructions" />
                    </Form.Group>
                    <Link to = "/AssignmentForm">
                      <Button variant="primary" type="submit">
                        Submit
                      </Button>
                    </Link>
                  </Form>
                </Col>
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
          <p className="added">Added</p>
        </MDBCard>
      </Row>
    );
    return result;
  }
  
  render() {
    return(this.getExercises(this.exercises))
  }
}
 

export default ExerciseForm;