import React from "react";
import { Component } from "react";
import logo from "../Mira.jpg"
import {Row, Col, Container, Image, Card, Button} from 'react-bootstrap'
import picture from '../Bonelli-RECT.jpg'
import '../css/ExerciseForm.css';

class ClientPage extends Component {
    constructor(props) {
        super(props);
        this.patient = {
            name: 'Eduardo Bonelli',
            nextSession: '1/1/2021',
            startDate: '1/1/2020',
            assignments: [
                {
                    due: '11/17',
                    status: 'Ongoing',
                    exercises: [
                        {
                            name: "Breathing Exercises",
                            due: '11/12'
                        },
                        {
                            name: "PCL-5 Assessments",
                            due: '11/15'
                        },
                        {
                            name: "Readings",
                            due: '11/17'
                        }
                    ]
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
                    <div className = "Exercise-form-title-container">
                        <p className = "Exercise-form-title-text">{this.patient.name}</p>
                    </div>
                <Container className = "background-container" fluid>
                    <Row className = "background">
                        <Col>
                            <div className = "border">
                                <div className = "Profile-info">
                                    <Row className = "Name-Row justify-content-md-center">
                                        <Image src={picture} roundedCircle className="picture"/>
                                    </Row>
                                    <Row className = "Name-Row justify-content-md-center">
                                        <p>{this.patient.name}</p>
                                    </Row>
                                    <Row className = "Name-Row justify-content-md-center">
                                       <p> Client since {this.patient.startDate} </p>
                                    </Row> 
                                    <Row className= "Name-Row justify-content-md-center">
                                        <p>Next Session: {this.patient.nextSession}</p>
                                    </Row>                                                             
                                </div>  
                            </div> 
                        </Col>
                        <Col>
                            <Row>

                            </Row>
                            <Row>
                                <Col>
                                <Card>
                                    <Card.Body>
                                        <Row>
                                            {this.patient.assignments[0].status} Due: <u>{this.patient.assignments[0].due}</u>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <p>Assignment Completion</p>
                                                <ExerciseProgress exercises={this.patient.assignments[0].exercises} />
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

class ExerciseProgress extends Component {
    constructor(props) {
        super(props);
        this.exercises = props.exercises;
    }

    getExercises(exercises) {
        const result = exercises.map((exercise) =>
          <Row>
              <div>
                <p>{exercise.name}</p>
                <p>Due: {exercise.due}</p>
              </div>
          </Row>
        );
        return result;
      }

    render() {
        return(this.getExercises(this.exercises))
      }
}

export default ClientPage;