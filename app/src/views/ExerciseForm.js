import React from "react";
import ReactDOM from 'react-dom'
import { Component } from "react";
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import useState from 'react';
import { FormControl } from '@material-ui/core';
import '../ExerciseForm.css';
import { MDBCard, MDBCardTitle } from "mdbreact";
import logo from '../Mira.jpg';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';




class ExerciseForm extends Component {
    constructor(props) {
      super(props);
      this.exercises = [
        {
          name: 'Flashback Grounding',
          frequency: 'Daily',
          due: '1 week',
          specialInstructions: 'Yes'
        }
      ]
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
            
            {/* <DropdownButton id="dropdown-item-button" title = "Dropdown">
              <Dropdown.ItemText>Dropdown item text</Dropdown.ItemText>
              <Dropdown.Item as="a" value = "Action">Action</Dropdown.Item>
              <Dropdown.Item as="a" value = "Another Action">Another action</Dropdown.Item>
              <Dropdown.Item as="a" value = "Something Else">Something else</Dropdown.Item>
            </DropdownButton> */}
              
            <Container className = "App-background-container">
              <Row className = "bg">
                <Col>
                  <Row className = "Added-exercise-list-text">Added Exercises:</Row>
                  <ExerciseRow exercises={this.exercises} />
                </Col>
                <Col>
                  <MDBCard className="Exercise-preview-body">
                    <MDBCardTitle className="Exercise-preview-placeholder-text">-Exercise Preview-</MDBCardTitle>
                  </MDBCard>          
                </Col>
                <Col>
                  <Form>
                    <Form.Group controlId="exerciseType">
                      <Form.Label>Exercise Type</Form.Label>
                      <Form.Control as="select" custom>
                        <option>Grounding</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="exerciseTitle">
                      <Form.Control placeholder="Exercise Title" />
                    </Form.Group>
                    <Form.Group controlId="frequency">
                      <Form.Label>Frequency</Form.Label>
                      <Form.Control as="select" custom>
                        <option>Daily</option>
                        <option>Weekly</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="specialInstructions">
                      <Form.Control placeholder="Special Instructions" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                  </Form>
                </Col>
              </Row>
            </Container> 
       </div>
       )
    }
  }

class ExerciseRow extends Component {
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
}

  //#region Exercise Type Dropdown
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href="./ExerciseForm"
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

/*<Dropdown className = "Exercise-type-dropdown-container">
              <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                Custom toggle
              </Dropdown.Toggle>

              <Dropdown.Menu as={CustomMenu}>
                <Dropdown.Item eventKey="1">Red</Dropdown.Item>
                <Dropdown.Item eventKey="2">Blue</Dropdown.Item>
                <Dropdown.Item eventKey="3" active>
                  Orange
                </Dropdown.Item>
                <Dropdown.Item eventKey="1">Red-Orange</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>,*/

export default ExerciseForm;