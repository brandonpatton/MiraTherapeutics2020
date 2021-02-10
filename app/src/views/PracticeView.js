import React from "react";
import green from '../Green.PNG';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { Component } from "react";
import picture from '../Bonelli-RECT.jpg';
import Image from 'react-bootstrap/Image';
import { Link } from "react-router-dom";
import '../css/PracticeView.css'


  class PracticeView extends Component {
    constructor(props) {
      super(props);
      this.state = { apiResponse: "" };
      this.listItems = []
      this.therapist = {
        name: 'Eduardo Bonelli',
        nextSession: '11/19',
        status: 'Ongoing',
      }
      this.patients = [
        {
          name: 'James Acaster',
          trackedSymptoms: 3,
          groundingExercises: 5,
          assignments: [true, true],
        },
        {
          name: 'Eduardo Bonelli',
          trackedSymptoms: 3,
          groundingExercises: 5,
          assignments: [true, false],
        },
        {
          name: 'Eduardo Bonelli',
          trackedSymptoms: 3,
          groundingExercises: 5,
          assignments: [true, false],
        },
        {
          name: 'Eduardo Bonelli',
          trackedSymptoms: 3,
          groundingExercises: 5,
          assignments: [true, false],
        },
        {
          name: 'Eduardo Bonelli',
          trackedSymptoms: 3,
          groundingExercises: 5,
          assignments: [true, false],
        }
      ];
    }

    render(){
      return(
        <div>
          <Container className = "Profile">
            <Row>
              <Col>
                <div className = "border">
                  <div className = "Profile-info">
                    <Row className = "Name-Row justify-content-md-center">
                      <Image src={picture} roundedCircle className="picture"/>
                    </Row>
                    <Row className = "Name-Row justify-content-md-center">
                      <Card className = "Name-Card">{this.therapist.name}</Card>
                    </Row>
                    <Row className= "Name-Row justify-content-md-center">
                      <Card className = "Next-Session-Date">{this.therapist.nextSession}</Card>
                    </Row>
                    <Row className = "Name-Row justify-content-md-center">
                      <Card className = "Status">{this.therapist.status}</Card>
                    </Row>
                    <Row className = "Name-Row justify-content-md-center">
                      <Link to = "/ClientView"><Button variant="info" className = "Client-View-Button">Go To Client View</Button></Link>
                    </Row> 
                  </div>  
                </div>             
              </Col>
              
              <Col xs={8}>
                <h1 className = "Practice-view-title">Practice View</h1>
                <Table className = "Table">
                <tbody>
                  <TableRow className = "Patients" patients = {this.patients} />
                </tbody>
                </Table>
              </Col>
            </Row>
          </Container>
          
          {/* <NumberList numbers = {this.numbers} /> */}
        </div>
      )
    }
  };
      
class TableRow extends Component {
  constructor(props) {
    super(props);
    this.patients = props.patients;
  }

  getRow(patients) {
    const rowItems = patients.map((patient) =>
      <tr>
        <td className = "Patient-name">Client: {patient.name}</td>
        <p className = "Tab"></p>
        <td className = "Tracked-symptoms">Tracked Symptoms {patient.trackedSymptoms} times</td>
        <p className = "Tab"></p>
        <td className = "Exercise-use">Grounding Exercises used {patient.groundingExercises} times</td>
        <p className = "Tab"></p>
        <td className = "Completion">Completed {this.getCompleted(patient.assignments)}/{patient.assignments.length} homework assignments</td>
        <p className = "Tab"></p>
        <td className = "Completion-indicator"><Image src={green} Green/></td>
        
      </tr>
    );
    return rowItems;
  } 

  getCompleted(assignments) {
    let count = 0;
    for (let assignment of assignments) {
      if (assignment) {
        count++;
      }
    }
    return count;
  }

  render() {
    return(this.getRow(this.patients))
  }

};
export default PracticeView;