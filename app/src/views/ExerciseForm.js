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
import {Link, Redirect} from 'react-router-dom';




class ExerciseForm extends Component {
    constructor(props) {
      super(props);
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
        
      }
      
      console.log(this.state.added);

      this.exerciseTypes = {
        "Grounding": ["Flashback Grounding", "Color Finder", "Breathing Exercise", "Vibration Tool", "Bilateral Simulation", "5, 4, 3, 2, 1 Grounding", "Any", "All"],
        "Reading": ["PTSD Content", "Trauma Story"],
        "Writing": ["Write About Trauma", "Free Writing"],
        "Worksheets": ["CPT Worksheet", "PTP Worksheet", "Upload Your Own"],
        "Assessments": ["PCL-5 Questionnaire", "PHQ-9 Questionnaire"],
        "Lists": ["Gratefullness List", "Self-Care", "Stuck Points", "Create Your Own List", "Track Symptoms", "Track Triggers"]      
      }
      this.dueByChoices = ["Next Session", "Custom Days", "Custom Weeks", "Choose Date"];
      this.frequenceyChoices = ["Daily", "Weekly", "Bi-Weekly", "Custom per Week"];
      if (this.state.added == [] || !this.state.added){
        this.exercises = [];
      } else {
        this.exercises = this.state.added;
      }
      
      if (this.state.exerciseToEdit == [] || this.state.exerciseToEdit == undefined){
        this.state.chosenExercise = {
          type: "Grounding",
          name: "Flashback Grounding",
          due: 'Next Session',
          frequency: 'Daily',
          specialInstructions: ''
      };
      } else {
        this.state.chosenExercise = {
          type: this.state.exerciseToEdit.type,
          name: this.state.exerciseToEdit.name,
          due: this.state.exerciseToEdit.due,
          frequency: this.state.exerciseToEdit.frequency,
          specialInstructions: this.state.exerciseToEdit.specialInstructions
      }
    }
    }
    
    bigFilter(exerciseList, exercise){
      const converted = [];
      for (let i = 0; i < exerciseList.length; i++){
        if (exerciseList[i].type == exercise.type && exerciseList[i].name == exercise.name && exerciseList[i].due == exercise.due && exerciseList[i].frequency == exercise.frequency && exerciseList[i].specialInstructions == exercise.specialInstructions){
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
      console.log(this.state.added);
      console.log(exercise);
      return exerciseList;
    }

    getExercises(exercises) {
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
                    {this.getExercises(this.bigFilter(this.exercises, this.state.chosenExercise))}
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
                        <Form.Control  onChange = {event => this.setState(()=>({chosenExercise: {type: event.target.value}}))} as="select" defaultValue = {this.state.chosenExercise.type} custom>
                          {this.getExerciseFormData(this.exerciseTypes)}
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="exerciseTitle">
                        <Form.Label>Exercise Title</Form.Label>
                        <Form.Control onChange = {event => this.setState(()=>({chosenExercise: {name: event.target.value}}))} as="select" defaultValue = {this.state.chosenExercise.name} custom>
                          {this.getExerciseTitle(this.exerciseTypes, this.state.chosenExercise.type)}
                        </Form.Control>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Due By</Form.Label>
                        <Form.Control onChange = {event => this.setState(()=>({chosenExercise: {due: event.target.value}}))} as="select" defaultValue = {"Next Session:" + toString(this.state.nextSession)} custom>
                          <option>{`Next Session: ${this.state.nextSession[0]}/${this.state.nextSession[1]}/${this.state.nextSession[2]}`}</option>
                          <option>Days</option>
                          <option>Weeks</option>
                          <option>Choose Date</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="frequency">
                        <Form.Label>Frequency</Form.Label>
                        <Form.Control onChange = {event => this.setState(()=>({chosenExercise: {due: event.target.value}}))} as="select" defaultValue = {this.state.chosenExercise.frequency} custom>
                          <option>Daily</option>
                          <option>Weekly</option>
                          <option>Bi-Weekly</option>
                          <option>[x] per week</option>
                        </Form.Control>
                      </Form.Group>
                      
                      <Form.Group controlId="specialInstructions">
                        <Form.Label>Special Instructions</Form.Label>
                        <Form.Control onChange = {event => this.setState(()=>({chosenExercise: {specialInstructions: event.target.value}}))} as = "textarea" placeholder="Enter Special Instructions"  rows = {4} />
                      </Form.Group>
                      <Link to = {{
                        pathname: "/AssignmentForm",
                        data: {editedExerciseList: this.exercises,
                                nextSession: this.state.nextSession} 
                      }}>
                        <Button onClick={this.setRedirect} variant="primary" type="Submit">
                          
                          Add
                        </Button>
                      </Link>
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

/*class ExerciseRow extends Component {
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
}*/
 

export default ExerciseForm;