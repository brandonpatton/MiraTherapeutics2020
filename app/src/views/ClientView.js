import React from "react";
import ReactDOM from 'react-dom';
import { Component } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import useState from 'react';
import { FormControl } from '@material-ui/core';
import '../css/ClientView.css';
import { MDBCard, MDBCardTitle } from "mdbreact";
import logo from '../Mira.jpg';
import {Row, Col, Container, Image, Card, Button} from 'react-bootstrap'
import Form from 'react-bootstrap/Form';
import picture from '../Bonelli-RECT.jpg';


import 'bootstrap/dist/css/bootstrap.min.css';
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ProgressBar from 'react-bootstrap/ProgressBar';

class ClientView extends Component {
  
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
                            due: '11/12',
                            completionStatus: "danger",
                            completionAmount: 75
                        },
                        {
                            name: "PCL-5 Assessments",
                            due: '11/15',
                            completionStatus: "success",
                            completionAmount: 100
                        },
                        {
                            name: "Readings",
                            due: '11/17',
                            completionAmount: "info",
                            completionAmount: 50
                            
                        }
                    ]
                }
            ]
          }
      this.bubbleInfo = [
        {
          bubble1Percentage: 100,
          bubble1Date: "11/20",
          bubble2Percentage: 50,
          bubble2Date: "11/27",
          bubble3Percentage: 100,
          bubble3Date: "12/04",
          bubble4Percentage: 100,
          bubble4Date: "12/12",
          bubble5Percentage: 100,
          bubble5Date: "12/19",
          bubble6Percentage: 100,
          bubble6Date: "12/26",
          bubble7Percentage: 50,
          bubble7Date: "1/02"
        }
      ]
      this.clientInfo = [
        {
          picture: picture,
          name: 'Eduardo Bonelli', //Get this from previous page
          clientSince: '11/10/19',
          nextSession: '11/28'
        }
      ]
    }

    render(){
      const percentage = 66;
      return(
        <div>
            <div className = "App-logo-container">
                <img src={logo} className="App-logo" alt="logo" />
            </div>
            <div className = "Client-view-title-container">
                <p className = "Client-view-title-text">Eduardo Bonelli</p> {/*Get this from previous page*/}
            </div>
              
            <Container fluid className = "background-container">
              <Row className = "background">
                <div className = "Client-information-container">
                  <Col>
                    <ClientInfo  clientInfo={this.clientInfo} />
                  </Col>
                </div>
                {/*<Col>
                  <MDBCard className="Exercise-preview-body">
                    <MDBCardTitle className="Exercise-preview-placeholder-text">-Exercise Preview-</MDBCardTitle>
                  </MDBCard>         
                </Col>*/} 
                <Col>
                      <Row>
                      </Row>
                      <Row>
                          <Col>
                          <Card className="Assignment-completion-body">
                              <Card.Body>
                                  <Row>
                                      <Col>
                                        <div className = "Assignment-completion-status-text-container">
                                          <MDBCardTitle className="Assignment-completion-status-text">{this.patient.assignments[0].status}</MDBCardTitle> {/*Get this from patient data*/}
                                        </div>
                                      </Col>
                                      <Col>
                                        <div className = "Assignment-due-date-container">
                                          <MDBCardTitle className="Assignment-due-date-text">Due: <u>{this.patient.assignments[0].due}</u> </MDBCardTitle> {/*Get this from patient data*/}
                                        </div>
                                      </Col>
                                       
                                  </Row>
                                  <Row>
                                      <Col>
                                        <div className = "Assignment-progress-container">
                                          <MDBCardTitle className="Assignment-completion-title-text">Assignment Completion</MDBCardTitle>
                                          <div className="Exercise-data-container">
                                            <ExerciseProgress exercises={this.patient.assignments[0].exercises} />
                                          </div>
                                        </div>
                                      </Col>
                                  </Row>
                              </Card.Body>
                          </Card>
                          </Col>
                      </Row> 
                  
                  <Row>
                    {/*<MDBCard className="Assignment">
                      <div className = "">
                        <MDBCardTitle className="t">Ongoing</MDBCardTitle> {/*Get this from patient data}
                      </div>
                    </MDBCard> */}
                    <BubbleInfo bubbleInfo={this.bubbleInfo} />
                    
                  </Row>        
                </Col>
              </Row>
            </Container> 
       </div>
       )
    }
  }

class ClientInfo extends Component {
  constructor(props) {
    super(props);
    this.clientInfo = props.clientInfo;
  }

  getClientInfo(clientInfo) {
    const result = clientInfo.map((client) =>
      <Row>
        <MDBCard className = "Client-information">
          <Image src={picture} roundedCircle className="picture"/>
          <div className="clientInfoCardContainer">
            <p className="clientInfoCard">{client.name}</p>
            <p className="clientInfoCard">Client Since: {client.clientSince}</p>
            <p className="clientInfoCard">Next Session: {client.nextSession}</p>
          </div>
        </MDBCard>
      </Row>
    );
    return result;
  }
  
  render() {
    return(this.getClientInfo(this.clientInfo))
  }
}

class BubbleInfo extends Component {
  constructor(props) {
    super(props);
    this.bubbleInfo = props.bubbleInfo;
  }
  getBubbleInfo(bubbleInfo) {
    const result = bubbleInfo.map((bubbles) =>
        <div className = "Progress-bubbles-container">
          <CircularProgressbar className = "Progress-bubbles" value={bubbles.bubble1Percentage}
            text={`${bubbles.bubble1Date}`}
            background
            backgroundPadding={6}
            styles={buildStyles({
              backgroundColor: "#2F9C3A",
              textColor: "#fff",
              pathColor: "transparent",
              trailColor: "transparent"
            })} />
                
          <CircularProgressbar className = "Progress-bubbles" value={bubbles.bubble2Percentage}
            text={`${bubbles.bubble2Date}`}
            background
            backgroundPadding={6}
            styles={buildStyles({
              backgroundColor: "#EB5050",
              textColor: "#fff",
              pathColor: "transparent",
              trailColor: "transparent"
            })} />

            <CircularProgressbar className = "Progress-bubbles" value={bubbles.bubble3Percentage}
              text={`${bubbles.bubble3Date}`}
              background
              backgroundPadding={6}
              styles={buildStyles({
                backgroundColor: "#2F9C3A",
                textColor: "#fff",
                pathColor: "transparent",
                trailColor: "transparent"
            })} />

            <CircularProgressbar className = "Progress-bubbles" value={bubbles.bubble4Percentage}
              text={`${bubbles.bubble4Date}`}
              background
              backgroundPadding={6}
              styles={buildStyles({
                backgroundColor: "#2F9C3A",
                textColor: "#fff",
                pathColor: "transparent",
                trailColor: "transparent"
            })} />
            <CircularProgressbar className = "Progress-bubbles" value={bubbles.bubble5Percentage}
              text={`${bubbles.bubble5Date}`}
              background
              backgroundPadding={6}
              styles={buildStyles({
                backgroundColor: "#2F9C3A",
                textColor: "#fff",
                pathColor: "transparent",
                trailColor: "transparent"
            })} />
            <CircularProgressbar className = "Progress-bubbles" value={bubbles.bubble6Percentage}
              text={`${bubbles.bubble6Date}`}
              background
              backgroundPadding={6}
              styles={buildStyles({
                backgroundColor: "#2F9C3A",
                textColor: "#fff",
                pathColor: "transparent",
                trailColor: "transparent"
            })} />
            <CircularProgressbar className = "Progress-bubbles" value={bubbles.bubble7Percentage}
              text={`${bubbles.bubble7Date}`}
              background
              backgroundPadding={6}
              styles={buildStyles({
                backgroundColor: "#3e98c7",
                textColor: "#fff",
                pathColor: "transparent",
                trailColor: "transparent"
            })} />
        </div>
    );
    return result;
  }
  render() {
    return(this.getBubbleInfo(this.bubbleInfo))
  }
}

class ExerciseProgress extends Component {
  constructor(props) {
      super(props);
      this.exercises = props.exercises;
  }

  getExercises(exercises) {
      const result = exercises.map((exercise) =>
      <div className = "Exercise-data">
        <Row>
            <Col>
              <ProgressBar variant = {exercise.completionStatus} now = {exercise.completionAmount}/>
            </Col>
            <Col>
                <p>{exercise.name}</p>
                <p>Due: {exercise.due}</p>
            </Col>
          </Row>
      </div>
      );
      return result;
    }

  render() {
      return(this.getExercises(this.exercises))
    }
}

  //#region Exercise Type Dropdown
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href="./ClientView"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
      &#x25bc;
    </a>
  ));

  const CustomMenu = React.forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
      const [value, setValue] = useState('');
  
      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          <FormControl
            autoFocus
            className="mx-3 my-2 w-auto"
            placeholder="Type to filter..."
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
          <ul className="list-unstyled">
            {React.Children.toArray(children).filter(
              (child) =>
                !value || child.props.children.toLowerCase().startsWith(value),
            )}
          </ul>
        </div>
      );
    },
  );
//#endregion  


export default ClientView;