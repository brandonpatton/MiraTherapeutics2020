import React from "react";
import ReactDOM from 'react-dom';
import { Component } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import useState from 'react';
import { FormControl } from '@material-ui/core';
import '../css/ClientView.css';
import { MDBCard, MDBCardTitle } from "mdbreact";
import {Redirect,Switch} from 'react-router-dom';
import logo from '../Mira.jpg';
import {Row, Col, Container, Image, Card, Button} from 'react-bootstrap'
import Form from 'react-bootstrap/Form';
import picture from '../Bonelli-RECT.jpg';
import { useHistory } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { LinearProgress } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';

class ClientView extends Component {
  
    constructor(props) {
      super(props);
      this.state = {
        patient: {
          name: props.location.data.name,
          nextSession: '1/1/2021',
          startDate: '1/1/2020',
          assignments: [
              {
                  due: '',
                  status: '',
                  exercises: [
                  ]
              }
          ]
        },
        selectedAssignment: 0

      }
      this.bubbleInfo = [
        {
          assignmentProgress: 100,
          due: "11/20",
          status: "Completed"
        },
        {
          assignmentProgress: 50,
          due: "11/27",
          status: "Completed"
        },
        {
          assignmentProgress: 100,
          due: "12/04",
          status: "Completed"
        },
        {
          assignmentProgress: 100,
          due: "12/12",
          status: "Completed"
        },
        {
          assignmentProgress: 100,
          due: "12/19",
          status: "Completed"
        },
        {
          assignmentProgress: 100,
          due: "12/26",
          status: "Completed"
        },
        {
          assignmentProgress: 100,
          due: "1/02",
          status: "Ongoing"
        }
      ]
      this.clientInfo = [
        {
          picture: picture,
          name: props.location.data.name, //Get this from previous page
          clientSince: '11/10/19',
          nextSession: '11/28'
        }
      ]

      changeVisibleAssignment = changeVisibleAssignment.bind(this);

    }

    componentDidMount() {
      fetch("http://localhost:3080/assignments/patient/PjohnDoe1")
          .then(res => res.json())
          .then(data => {
            data.sort((a, b) => a.visitNumber - b.visitNumber)
            this.setState({patient: {assignments: data}})
          });

    }

    render(){
      return(
        <div>
            <div className = "App-logo-container">
                <img src={logo} className="App-logo" alt="logo" />
            </div>
            <div className = "Client-view-title-container">
                <p className = "Client-view-title-text">{this.state.patient.name}</p> {/*Get this from previous page*/}
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
                    {/*<MDBCard className="Assignment">
                      <div className = "">
                        <MDBCardTitle className="t">Ongoing</MDBCardTitle> {/*Get this from patient data}
                      </div>
                    </MDBCard> */}
                        {getBubbleInfo(this.state.patient.assignments)}
                      </Row>
                      <Row>
                          <Col>
                          <Card className="Assignment-completion-body">
                              <Card.Body>
                                  <Row>
                                      <Col>
                                        <div className = "Assignment-completion-status-text-container">
                                          <MDBCardTitle className="Assignment-completion-status-text">{this.state.patient.assignments[this.state.selectedAssignment].status}</MDBCardTitle> {/*Get this from patient data*/}
                                        </div>
                                      </Col>
                                      <Col>
                                        <div className = "Assignment-due-date-container">
                                          <MDBCardTitle className="Assignment-due-date-text">Due by: <u>{this.state.patient.assignments[this.state.selectedAssignment].due}</u> </MDBCardTitle> {/*Get this from patient data*/}
                                        </div>
                                      </Col>
                                       
                                  </Row>
                                  <Row>
                                      <Col>
                                        <div className = "Assignment-progress-container">
                                          <MDBCardTitle className="Assignment-completion-title-text">Assignment Completion</MDBCardTitle>
                                          <div className="Exercise-data-container">
                                            {getExercises(this.state.patient.assignments[this.state.selectedAssignment].exerciseList)}
                                          </div>
                                        </div>
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

function changeVisibleAssignment(assignmentNumber) {
  this.setState(() => ({
    selectedAssignment: assignmentNumber
  }))
}

let getBubbleInfo = (bubbleInfo) => {
  const ongoingBubbleColor = '#00b5d9'
  const completedBubbleColor = '#20315f'
  const completedBubblePathColor = '#FFFFFF'
    let progressBubbleComponents = []
    // 7 Assignments visible at a time
    for (let assignmentIndex = 6; assignmentIndex >= 0; assignmentIndex--) {
      if (assignmentIndex >= bubbleInfo.length) {
        progressBubbleComponents.unshift(
          <div className = "Progress-bubble-column-hidden">
            <CircularProgressbar  className = "Progress-bubbles"
            background
            backgroundPadding={6}/>
          </div>
        )
      } else {
        progressBubbleComponents.unshift(
          <div className = "Progress-bubble-column" onClick = {() => changeVisibleAssignment(assignmentIndex)}>
            <CircularProgressbar  className = "Progress-bubbles" value={bubbleInfo[assignmentIndex].assignmentProgress}
            text={`${bubbleInfo[assignmentIndex].due}`}
            background
            backgroundPadding={6}
            styles={buildStyles({
              backgroundColor: `${bubbleInfo[assignmentIndex].status == "Ongoing" ? ongoingBubbleColor : completedBubbleColor}`,
              textColor: "#fff",
              pathColor: `${bubbleInfo[assignmentIndex].status == "Ongoing" ? '#000000' : completedBubblePathColor}`,
              trailColor: "transparent"
            })}/>
          </div>)
      }
    }
  return (<div className = "Progress-bubbles-container">
    {progressBubbleComponents}
  </div>)
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

 function getExercises(exercises) {
      if (exercises) 
      {
        const ActualLinearProgress = withStyles((theme) => ({
          root: {
            height: 30,
            borderRadius: 10
          },
          colorPrimary: {
            backgroundColor: "#BBBBBB"
          },
          bar: {
            backgroundColor: "#ac6ef3"
          }
        }))(LinearProgress);

        const ExpectedLinearProgress = withStyles((theme) => ({
          root: {
            height: 30,
            borderRadius: 10
          },
          colorPrimary: {
            backgroundColor: "#BBBBBB"
          },
          bar: {
            backgroundColor: "#20315f"
          }
        }))(LinearProgress);
        
      const result = exercises.map((exercise) =>
      <div className = "Exercise-data">
        <Row>
            <Col>
              <ActualLinearProgress className = "Linear-progress-bar" variant = {"determinate"} value = {exercise.completionAmount} color = "primary" thickness={5}/>
              <ExpectedLinearProgress className = "Linear-progress-bar" variant = {"determinate"} value = {exercise.completionStatus} color = "secondary"/>
            </Col>
            <Col>
                <p>{exercise.name}<br></br>{exercise.due}</p>
            </Col>
        </Row>
        <br></br>
      </div>
      );
      return result;
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