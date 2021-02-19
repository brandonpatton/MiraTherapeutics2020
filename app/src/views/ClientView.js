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
import {Row, Col, Container, Image, Card, /*Button*/} from 'react-bootstrap'
import Form from 'react-bootstrap/Form';
import picture from '../Bonelli-RECT.jpg';
import { useHistory } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  CircularProgressbar,
  buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { LinearProgress } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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
                  // status of assignments numbers: 0 - New, 1 - Ongoing, 2 - Completed
                  status: 0,
                  exercises: [
                  ]
              }
          ]
        },
        selectedAssignment: {},
        assignmentCompletionDialogOpen: false

      }
      this.completionStatusWords = ["New", "Ongoing", "Completed"]
      this.clientInfo = [
        {
          picture: picture,
          name: props.location.data.name, //Get this from previous page
          clientSince: '11/10/19',
          nextSession: '11/28'
        }
      ]

      changeVisibleAssignment = changeVisibleAssignment.bind(this);
      completeAssignmentButton = completeAssignmentButton.bind(this)
      completeAssignment = completeAssignment.bind(this)

    }

    componentDidMount() {
      fetch("http://localhost:3080/assignments/patient/PjohnDoe1")
          .then(res => res.json())
          .then(data => {
            // sort the assignments based on the number of the visit during which they were assigned
            data.sort((a, b) => a.visitNumber - b.visitNumber)
            // update the state with the assignments in the right order
            this.setState(() => ({patient: {assignments: data}}))
            // make the assignment that's visible to the therapist the most recent one
            this.setState((state) => ({selectedAssignment: state.patient.assignments[state.patient.assignments.length - 1]}))
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
                                          <MDBCardTitle className="Assignment-completion-status-text">{this.completionStatusWords[this.state.selectedAssignment.status]}</MDBCardTitle> {/*Get this from patient data*/}
                                        </div>
                                      </Col>
                                      <Col className = "Assignment-due-date-col">
                                        <div className = "Assignment-due-date-container">
                                          <MDBCardTitle className="Assignment-due-date-text">Due by: <u>{this.state.selectedAssignment.due}</u> </MDBCardTitle> {/*Get this from patient data*/}
                                        </div>
                                      </Col>
                                      <Col className = "Complete-assignment-button-col">
                                        {completeAssignmentButton()}
                                      </Col>
                                  </Row>
                                  <Row>
                                      <Col>
                                        <div className = "Assignment-progress-container">
                                          <MDBCardTitle className="Assignment-completion-title-text">Assignment Completion</MDBCardTitle>
                                          <div className="Exercise-data-container">
                                            {/*getExercises(this.state.patient.assignments[this.state.selectedAssignment].exerciseList)  until selectedAssignment being an object works*/}
                                            {getExercises(this.state.selectedAssignment.exerciseList)}
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

function completeAssignmentButton() {

  const handleClickOpen = () => {
    this.setState(() => ({
      assignmentCompletionDialogOpen: true
    }))
  };
  
  const handleClose = () => {
    this.setState(() => ({
      assignmentCompletionDialogOpen: false
    }))
  };


  return (<div className = "Complete-assignment-button-div">
  <Button className = "clickMe" variant="outlined" color="primary" onClick={handleClickOpen} disabled = {this.state.selectedAssignment.status == 2}>
        {this.state.selectedAssignment.status == 0 ? "Create Assignment" : "Complete Assignment"}
      </Button>
      <Dialog
        open = {this.state.assignmentCompletionDialogOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{this.state.selectedAssignment.status == 1 ? "Complete Assignment?" : "Create Assignment?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {this.state.selectedAssignment.status == 1 ? "Are you sure you want to complete the selected assignment?" : "Would you like to create a new assignment?"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.state.selectedAssignment.status == 1 ? completeAssignment : (() => {alert("You want to make a new assignment"); this.setState(() => ({assignmentCompletionDialogOpen: false}))})} color="primary">
            Yes
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
      </div>)
}

function completeAssignment() {
  // Assignments are sorted in descending order of visitNumber (whatever nth visit during which they were assigned)
  // change status of selected assignment to "Complete"
  let targetVisitNumber = this.state.selectedAssignment.visitNumber
  let data = this.state.patient.assignments
  for (let assignment of data) {
    if (assignment.visitNumber == targetVisitNumber) {
      assignment.status = 2
      break
    }
  }

  // Check if the newest assignment is an actual assignment. If not, make a new barebones assignment so that a new bubbble can be made. Just exists with required fields for visuals
  if (data[data.length - 1].status !== 0) {
    let newAssignmentForNewBubble = {
    visitNumber: data.length + 1,
    due: "New",
    assignmentProgress: 0,
    status: 0
    
    }
    data.push(newAssignmentForNewBubble)
  }
    this.setState(() => ({
      patient: {assignments: data},
      selectedAssignment: data[data.length - 1],
      assignmentCompletionDialogOpen: false
    }))
}

function changeVisibleAssignment(visitNumber) {
  // change the assignment being shown to a new one based on the visitNumber provided by the assignment bubble
  let correspondingAssignmentByVisitNumber;
  for (let assignment of this.state.patient.assignments) {
    if (assignment.visitNumber == visitNumber) {
      correspondingAssignmentByVisitNumber = assignment
      break
    }
  }
  this.setState(() => ({
    selectedAssignment: correspondingAssignmentByVisitNumber
  }))
}

let getBubbleInfo = (assignmentsList) => {
  const ongoingBubbleColor = '#00b5d9'
  const completedBubbleColor = '#20315f'
  const completedBubblePathColor = '#FFFFFF'
    let progressBubbleComponents = []
    // 7 Assignments on the row at a time
    for (let assignmentIndex = 0; assignmentIndex < 7; assignmentIndex++) {
      // Make an invisible assignment bubble so the spacing still works out
      if (assignmentsList.length <= assignmentIndex) {
        progressBubbleComponents.unshift(
          <div className = "Progress-bubble-column-hidden">
            <CircularProgressbar  className = "Progress-bubbles"
            background
            backgroundPadding={6}/>
          </div>
        )
      } else {
        let targetIndex = assignmentsList.length - assignmentIndex - 1
        let targetAssignment = assignmentsList[targetIndex]
        progressBubbleComponents.unshift(
          <div className = "Progress-bubble-column" onClick = {() => changeVisibleAssignment(targetAssignment.visitNumber)}>
            <CircularProgressbar  className = "Progress-bubbles" value={targetAssignment.assignmentProgress}
            text={`${targetAssignment.due}`}
            background
            backgroundPadding={6}
            styles={buildStyles({
              backgroundColor: `${targetAssignment.status == 2 ? completedBubbleColor : ongoingBubbleColor}`,
              textColor: "#fff",
              pathColor: `${targetAssignment.status == 2 ? completedBubblePathColor : '#000000'}`,
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