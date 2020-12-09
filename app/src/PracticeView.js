import React from "react";
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import { Component } from "react";

  class PracticeView extends Component {
    constructor(props) {
      super(props);
      this.state = { apiResponse: "" };
      this.listItems = []
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
          <Container>
            <Row>
              <Col>
                <h1>Profile</h1>
              </Col>
              <Col xs={10}>
                <Table>
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