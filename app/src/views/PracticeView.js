import React from "react";
import green from '../Green.PNG';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { Component } from "react";
import bonelliPicture from '../Bonelli-RECT.jpg';
import acasterPicture from '../james-acaster.jpg'
import Image from 'react-bootstrap/Image';
import { Link } from "react-router-dom";
import { Redirect } from 'react-router-dom'
import '../css/PracticeView.css'


function patientClick(patient) {
  this.setState(() => ({
    selectedPatient: patient
  }));
}

  class PracticeView extends Component {
    constructor(props) {
      super(props);
      this.state = { selectedPatient: {
                      name: 'Bruce Wayne',
                      trackedSymptoms: 3,
                      groundingExercises: 5,
                      assignments: [true, false],
                      nextSession: '3/4',
                      status: 'Ongoing',
                    } };
      this.listItems = []
      this.patients = [
        {
          name: 'Bruce Wayne',
          trackedSymptoms: 3,
          groundingExercises: 5,
          assignments: [true, false],
          nextSession: '3/4',
          status: 'Ongoing'
        },
        {
          name: 'Craig Ferguson',
          trackedSymptoms: 3,
          groundingExercises: 5,
          assignments: [true, false],
          nextSession: '2/8',
          status: 'Ongoing'
        },
        {
          name: 'Eduardo Bonelli',
          trackedSymptoms: 3,
          groundingExercises: 5,
          assignments: [true, false],
          nextSession: '12/24',
          status: 'Ongoing'
        },
        {
          name: 'James Acaster',
          trackedSymptoms: 3,
          groundingExercises: 5,
          assignments: [true, true],
          nextSession: '11/20',
          status: 'Completed'
        },
        {
          name: 'Scooby Doo',
          trackedSymptoms: 3,
          groundingExercises: 5,
          assignments: [true, false],
          nextSession: '3/14',
          status: 'Ongoing'
        }
      ];

      patientClick = patientClick.bind(this);

    }

    componentDidMount() {
      window.onpopstate = function(event) {
        // Allows back and forth action by refreshing the page if it was reached using the browser's back button
        if (event.currentTarget.location.pathname == "/PracticeView") window.location.reload()
    }
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
                      <Image src={acasterPicture} roundedCircle className="picture"/>
                    </Row>
                    <Row className = "Name-Row justify-content-md-center">
                      <Card className = "Name-Card">{this.state.selectedPatient.name}</Card>
                    </Row>
                    <Row className= "Name-Row justify-content-md-center">
                      <Card className = "Next-Session-Date">{this.state.selectedPatient.nextSession}</Card>
                    </Row>
                    <Row className = "Name-Row justify-content-md-center">
                      <Card className = "Status">{this.state.selectedPatient.status}</Card>
                    </Row>
                    <Row className = "Name-Row justify-content-md-center">
                      <Link to = {{
                          pathname: "/ClientView",
                          data: {name: this.state.selectedPatient.name} // your data array of objects
                        }}><Button variant="info" className = "Client-View-Button">Go To Client View</Button></Link>
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
      <tr onClick = {() => patientClick(patient)}>
        <td className = "Patient-name" >Client: {patient.name}</td>
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
export default PracticeView