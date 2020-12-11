import React from "react";
import green from './Green.PNG';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { Component } from "react";
import picture from './Bonelli-RECT.jpg';
import Image from 'react-bootstrap/Image';
import './PracticeView.css'


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
                <Row className = "Name-Row justify-content-md-center">
                    <Image src={picture} roundedCircle className="App-logo"/>
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
                    <Button variant="info" className = "Client-View-Button">Go To Client View</Button>
                  </Row>   
                  </div>             
              </Col>
              
              <Col xs={8}>
                <h1>Practice View</h1>
                <Table className = "Table">
                <tbody>
                  <TableRow patients = {this.patients} />
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
        <td>Client: {patient.name}</td>
        <td>Tracked Symptoms {patient.trackedSymptoms} times</td>
        <td>Grounding Exercises used {patient.groundingExercises} times</td>
        <td>Completed {this.getCompleted(patient.assignments)}/{patient.assignments.length} homework assignments</td>
        <td><Image src={green} Green/></td>
        
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