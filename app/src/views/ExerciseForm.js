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
import {Redirect} from 'react-router-dom';




class ExerciseForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
        chosenExerciseType: "Grounding",
        redirect: false,
      }
      


      this.exerciseTypes = {
        "Grounding": ["Flashback Grounding", "Color Finder", "Breathing Exercise", "Vibration Tool", "Bilateral Simulation", "5, 4, 3, 2, 1 Grounding", "Any", "All"],
        "Reading": ["PTSD Content", "Trauma Story"],
        "Writing": ["Write About Trauma", "Free Writing"],
        "Worksheets": ["CPT Worksheet", "PTP Worksheet", "Upload Your Own"],
        "Assessments": ["PCL-5 Questionnaire", "PHQ-9 Questionnaire"],
        "Lists": ["Gratefullness List", "Self-Care", "Stuck Points", "Create Your Own List", "Track Symptoms", "Track Triggers"]      
      }
      this.exercises = [];
      

    }
    getExerciseFormData(data){
      const result = Object.keys(data).map((d) =>
        <option>{d}</option>
      );
      return result;
    }
    getExerciseTitle(data, choice){
      const result = data[choice].map((d) =>
        <option>{d}</option>
      );
      return result;
    }
    setRedirect = () => {
      this.setState({
        redirect: true
      });
    }
    doRedirect = () => {
      if(this.state.redirect){
          return <Redirect to='/AssignmentForm'/>
      } 
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
                        <Form.Control  onChange = {event => this.setState(()=>({chosenExerciseType: event.target.value}))} as="select" custom>
                          {this.getExerciseFormData(this.exerciseTypes)}
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="exerciseTitle">
                        <Form.Label>Exercise Title</Form.Label>
                        <Form.Control as="select" custom>
                          {this.getExerciseTitle(this.exerciseTypes, this.state.chosenExerciseType)}
                        </Form.Control>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Due By</Form.Label>
                        <Form.Control as="select" custom>
                          <option>Next Session</option>
                          <option>Days</option>
                          <option>Weeks</option>
                          <option>Choose Date</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="frequency">
                        <Form.Label>Frequency</Form.Label>
                        <Form.Control as="select" custom>
                          <option>Daily</option>
                          <option>Weekly</option>
                          <option>Bi-Weekly</option>
                          <option>[x] per week</option>
                        </Form.Control>
                      </Form.Group>
                      
                      <Form.Group controlId="specialInstructions">
                        <Form.Label>Special Instructions</Form.Label>
                        <Form.Control as = "textarea" placeholder="Enter Special Instructions" rows = {4} />
                      </Form.Group>
                      <Button onClick={this.setRedirect} variant="primary" type="Submit">
                        
                        Add
                      </Button>
                      
                    </Form>
                  </div>
                </Col>
              </Row>
            </Container> 
          {this.doRedirect()}
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