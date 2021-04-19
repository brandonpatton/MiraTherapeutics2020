import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import green from "../Green.PNG";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import bonelliPicture from "../Bonelli-RECT.jpg";
import acasterPicture from "../james-acaster.jpg";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";
import "../css/PracticeView.css";
import { openClient } from "../redux/slices/clientSlice";
import { updateTherapistClientList } from "../redux/slices/therapistSlice"

const PracticeView = () => {
  
  const dispatch = useDispatch();



  const { client } = useSelector((state) => state.client);

  const [patient, setPatient] = useState(
    client.name.length == 0
      ? {
          name: "Bruce Wayne",
          id: "PjohnDoe1",
          trackedSymptoms: 3,
          groundingExercises: 5,
          assignments: [true, false],
          nextSession: "3/4",
          status: "Ongoing",
        }
      : client
  );

  const [patientList, setPatientList] = useState([
    {
      name: "Bruce Wayne",
      id: "PjohnDoe1",
      trackedSymptoms: 3,
      groundingExercises: 5,
      assignments: [true, false],
      nextSession: "3/4",
      status: "Ongoing",
    },
    {
      name: "Craig Ferguson",
      id: "PcraigFerguson1",
      trackedSymptoms: 3,
      groundingExercises: 5,
      assignments: [true, false],
      nextSession: "2/8",
      status: "Ongoing",
    },
    {
      name: "Eduardo Bonelli",
      id: "PeddyBonelli1",
      trackedSymptoms: 3,
      groundingExercises: 5,
      assignments: [true, false],
      nextSession: "12/24",
      status: "Ongoing",
    },
    {
      name: "James Acaster",
      id: "PjamesAcaster1",
      trackedSymptoms: 3,
      groundingExercises: 5,
      assignments: [true, true],
      nextSession: "11/20",
      status: "Completed",
    },
    {
      name: "Scooby Doo",
      id: "PscoobyDoo1",
      trackedSymptoms: 3,
      groundingExercises: 5,
      assignments: [true, false],
      nextSession: "3/14",
      status: "Ongoing",
    },
  ]);

  const [fetchedTherapistClientInfo, setFetchedTherapistClientInfo] = useState(false)

  useEffect(() => {
    // Only set the therapist slice once
    if (!fetchedTherapistClientInfo){
      updateTherapistStore()
      setFetchedTherapistClientInfo(true)
    }
    // window.onpopstate = function(event) {
    //   // Allows back and forth action by refreshing the page if it was reached using the browser's back button
    //   if (event.currentTarget.location.pathname == "/PracticeView") window.location.reload()
    // }
  });

  // Updates the client slice by fetching all client assignment lists from the database
   const updateTherapistStore = async () => {
    const postSettings = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({patientIds: ["PjohnDoe1"]})
    }
  
    let clientInfoObj = await fetch(`http://localhost:3080/assignments/patient/batch/`, postSettings)
    clientInfoObj = await clientInfoObj.json()

    dispatch(
      updateTherapistClientList({
        clientInfo: clientInfoObj
      })
    )
  
  }

  function clientClick(client) {
    setPatient(client);
  }

  const updateCurrentClient = (client) => {
    dispatch(
      openClient({
        id: client.id,
        name: client.name,
        nextSession: client.nextSession,
        status: client.status,
      })
    );
  };

  function getRow(patients) {
    const rowItems = patients.map((patient) => (
      <tr onClick={() => clientClick(patient)}>
        <td className="Patient-name">Client: {patient.name}</td>
        <p className="Tab"></p>
        <td className="Tracked-symptoms">
          Tracked Symptoms {patient.trackedSymptoms} times
        </td>
        <p className="Tab"></p>
        <td className="Exercise-use">
          Grounding Exercises used {patient.groundingExercises} times
        </td>
        <p className="Tab"></p>
        <td className="Completion">
          Completed {getCompleted(patient.assignments)}/
          {patient.assignments.length} homework assignments
        </td>
        <p className="Tab"></p>
        <td className="Completion-indicator">
          <Image src={green} Green />
        </td>
      </tr>
    ));
    return rowItems;
  }

  function getCompleted(assignments) {
    let count = 0;
    for (let assignment of assignments) {
      if (assignment) {
        count++;
      }
    }
    return count;
  }

  return (
    <div>
      <Container className="Profile">
        <Row>
          <Col>
            <div className="border">
              <div className="Profile-info">
                <Row className="Name-Row justify-content-md-center">
                  <Image
                    src={acasterPicture}
                    roundedCircle
                    className="picture"
                  />
                </Row>
                <Row className="Name-Row justify-content-md-center">
                  <Card className="Name-Card">{patient.name}</Card>
                </Row>
                <Row className="Name-Row justify-content-md-center">
                  <Card className="Next-Session-Date">
                    {patient.nextSession}
                  </Card>
                </Row>
                <Row className="Name-Row justify-content-md-center">
                  <Card className="Status">{patient.status}</Card>
                </Row>
                <Row className="Name-Row justify-content-md-center">
                  <Link
                    to={{
                      pathname: "/ClientView",
                      data: { name: patient.name }, // your data array of objects
                    }}
                  >
                    <Button
                      onClick={() => updateCurrentClient(patient)}
                      variant="info"
                      className="Client-View-Button"
                    >
                      Go To Client View
                    </Button>
                  </Link>
                </Row>
              </div>
            </div>
          </Col>

          <Col xs={8}>
            <h1 className="Practice-view-title">Practice View</h1>
            <Table className="Table">
              <tbody>
                {/*<TableRow className = "Patients" patients = {this.patients} />*/}
                {getRow(patientList)}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>

      {/* <NumberList numbers = {this.numbers} /> */}
    </div>
  );
};

export default PracticeView;
